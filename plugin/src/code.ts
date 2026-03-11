// Bilingual Translate Plugin
// Select text layers → pick target language → translate in-place
// Dual engine: GPT-4o mini (primary) + Lingva (free fallback)

figma.showUI(__html__, { width: 340, height: 480 });

// ─── Collect all text nodes from a selection (recursive) ──────

function findTextNodes(nodes: readonly SceneNode[]): TextNode[] {
  const result: TextNode[] = [];
  for (const node of nodes) {
    if (node.type === 'TEXT') {
      result.push(node);
    } else if ('children' in node) {
      result.push(...findTextNodes((node as ChildrenMixin & SceneNode).children));
    }
  }
  return result;
}

// ─── Send current selection info to UI ────────────────────────

function sendSelection() {
  const sel = figma.currentPage.selection;
  const textNodes = findTextNodes(sel);

  if (textNodes.length === 0) {
    figma.ui.postMessage({ type: 'selection', data: { count: 0, texts: [] } });
    return;
  }

  const texts = textNodes.map(t => ({
    id: t.id,
    name: t.name,
    preview: t.characters.length > 60 ? t.characters.slice(0, 60) + '...' : t.characters,
    characters: t.characters,
  }));

  figma.ui.postMessage({ type: 'selection', data: { count: texts.length, texts } });
}

figma.on('selectionchange', sendSelection);
sendSelection();

// ─── Settings persistence ─────────────────────────────────────

async function loadSettings() {
  const apiKey = (await figma.clientStorage.getAsync('apiKey')) ?? '';
  const monthlyCap = (await figma.clientStorage.getAsync('monthlyCap')) ?? 2;
  const monthlyUsage = (await figma.clientStorage.getAsync('monthlyUsage')) ?? 0;
  const usageMonth = (await figma.clientStorage.getAsync('usageMonth')) ?? '';
  figma.ui.postMessage({ type: 'settings-loaded', data: { apiKey, monthlyCap, monthlyUsage, usageMonth } });
}

async function saveSettings(data: { apiKey: string; monthlyCap: number; monthlyUsage: number; usageMonth: string }) {
  await figma.clientStorage.setAsync('apiKey', data.apiKey);
  await figma.clientStorage.setAsync('monthlyCap', data.monthlyCap);
  await figma.clientStorage.setAsync('monthlyUsage', data.monthlyUsage);
  await figma.clientStorage.setAsync('usageMonth', data.usageMonth);
}

loadSettings();

// ─── Handle messages from UI ──────────────────────────────────

figma.ui.onmessage = async (msg: { type: string; data?: any }) => {
  if (msg.type === 'load-settings') {
    await loadSettings();
  }

  if (msg.type === 'save-settings') {
    await saveSettings(msg.data);
  }

  if (msg.type === 'apply-translations') {
    const translations: { id: string; translated: string }[] = msg.data.translations;
    let applied = 0;

    for (const t of translations) {
      const node = figma.getNodeById(t.id);
      if (!node || node.type !== 'TEXT') continue;

      const textNode = node as TextNode;

      // Store original text so user can undo via plugin
      if (!textNode.getPluginData('originalText')) {
        textNode.setPluginData('originalText', textNode.characters);
      }

      // Load all fonts used in this text node
      const len = textNode.characters.length;
      if (len === 0) continue;

      const fontsUsed = new Set<string>();
      for (let i = 0; i < len; i++) {
        const font = textNode.getRangeFontName(i, i + 1);
        if (font !== figma.mixed) {
          const key = `${font.family}::${font.style}`;
          if (!fontsUsed.has(key)) {
            fontsUsed.add(key);
            await figma.loadFontAsync(font);
          }
        }
      }

      textNode.characters = t.translated;
      applied++;
    }

    figma.notify(`Translated ${applied} text layer${applied !== 1 ? 's' : ''}`);
    sendSelection();
  }

  if (msg.type === 'restore-originals') {
    const sel = figma.currentPage.selection;
    const textNodes = findTextNodes(sel);
    let restored = 0;

    for (const tn of textNodes) {
      const orig = tn.getPluginData('originalText');
      if (!orig) continue;

      const len = tn.characters.length;
      const fontsUsed = new Set<string>();
      for (let i = 0; i < len; i++) {
        const font = tn.getRangeFontName(i, i + 1);
        if (font !== figma.mixed) {
          const key = `${font.family}::${font.style}`;
          if (!fontsUsed.has(key)) {
            fontsUsed.add(key);
            await figma.loadFontAsync(font);
          }
        }
      }

      tn.characters = orig;
      tn.setPluginData('originalText', '');
      restored++;
    }

    if (restored > 0) {
      figma.notify(`Restored ${restored} text layer${restored !== 1 ? 's' : ''}`);
    } else {
      figma.notify('No originals to restore');
    }
    sendSelection();
  }
};
