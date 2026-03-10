# 💬 Bilingual Comments

**Custom sticky-note comment system with bilingual support and read/unread tracking.**

---

## 🎯 What This Solves

**Your exact need:**
> "Create custom stickies that can be added to the canvas that we can use as 'comments', and that can be marked as read or unread, where the unread ones have a red dot and are shown inside of the UI. Add a reply button that will paste a separate sticky under the last one."

**Solution:**
✅ Custom bilingual sticky notes (not native Figma comments)
✅ Read/unread tracking with visual indicators
✅ Unread comments shown with **red dot** in plugin UI
✅ **Red tint** on canvas for unread stickies
✅ Reply functionality (creates sticky below parent)
✅ Instant language toggle (EN ↔ CN)
✅ Perfect for bilingual team collaboration!

---

## 🌟 Key Features

### 💬 Custom Comment Stickies

**Not native Figma comments** - These are special sticky notes that:
- Store BOTH English and Chinese text
- Can be toggled between languages instantly
- Track read/unread status per user
- Support threaded replies

### 🔴 Visual Indicators

**Unread Comments:**
- **Red dot** in plugin UI comment list
- **Red tint** (light pink) on canvas sticky
- **Badge** showing unread count

**Read Comments:**
- No red dot in UI
- **Yellow tint** on canvas sticky
- Normal appearance

### 📝 Reply Threading

**Simple threading:**
- Click "Reply" on any comment
- Reply sticky is created **directly below** parent
- Visual indent shows relationship
- All in bilingual mode!

### 🌐 Instant Language Toggle

**Each team member sees their language:**
- You write in Chinese
- Click toggle → Devs see English
- No manual translation needed
- Instant switching (no API call after initial)

---

## 📦 How It Works

### Creating a Comment:

1. **Write comment** in your language (EN or CN)
2. **Click "Post Comment"**
3. Plugin:
   - Translates to other language using AI
   - Creates sticky note on canvas
   - Stores BOTH languages in sticky's data
   - Marks as "unread" for others
   - Shows with red tint on canvas

### Viewing Comments:

**In Plugin UI:**
```
Comments                           🔴 3 unread

🔴 Sarah Chen                      2 min ago
   这个按钮需要改成圆角
   📍 Jump to  ↩️ Reply  ✓ Mark read

   Alice Wang (Reply)             1 min ago
   好的，我来改
   📍 Jump to  ↩️ Reply  ✓ Mark read

📝 Mike Johnson                    10 min ago
   Looks good! Ship it.
   📍 Jump to  ↩️ Reply
```

**On Canvas:**
- Unread = Light red/pink tint
- Read = Light yellow tint
- Reply stickies positioned below parent

### Toggling Language:

**Chinese user:**
```
Sticky content:
💬 Sarah Chen
2025-02-09 14:30

这个按钮需要改成圆角
```

**English user (after toggle):**
```
Sticky content:
💬 Sarah Chen
2025-02-09 14:30

This button needs rounded corners
```

**Same sticky, different language!**

---

## 🚀 Setup (2 Minutes)

### Installation:

```bash
# 1. Install MCP server
cd bilingual-comments/mcp-server
npm install
npm run build

# 2. Install plugin
cd ../plugin
npm install
npm run build

# 3. Set API key
export ANTHROPIC_API_KEY=sk-ant-your-key

# 4. Load in Figma Desktop
# Plugins → Development → Import manifest.json
```

---

## 💡 Usage

### Start Bridge Server:

```bash
cd mcp-server
npm run bridge

# You'll see:
💬 Bilingual Comments Bridge Server
📍 Running on http://localhost:3461
✅ Ready for bilingual team collaboration!
```

### In Figma:

**1. Run plugin:**
- Plugins → Bilingual Comments

**2. Post a comment:**
- Type your comment (in your language)
- Click "Post Comment"
- Wait 2 seconds (translates)
- Sticky appears on canvas!

**3. View comments:**
- Plugin UI shows all comments
- Unread have **red dot 🔴**
- Click to jump to comment on canvas
- Click "Mark read" to mark as read

**4. Reply to comment:**
- Click "↩️ Reply" on any comment
- Type your reply
- Reply sticky appears below parent

**5. Toggle language:**
- Click language toggle button (top)
- All comments instantly switch language
- Your preference is saved

---

## 🎨 Visual System

### Read/Unread Indicators:

| State | Canvas Sticky | Plugin UI | Badge |
|-------|--------------|-----------|-------|
| Unread (new) | 🟥 Light red tint | 🔴 Red dot | Shows count |
| Read | 🟨 Light yellow tint | No dot | Hidden |

### Example:

**Unread comment on canvas:**
```
┌─────────────────────────┐
│ 💬 Sarah Chen           │ ← Light RED background
│ 2025-02-09 14:30        │
│                         │
│ 这个按钮需要改成圆角    │
│                         │
└─────────────────────────┘
```

**After marking as read:**
```
┌─────────────────────────┐
│ 💬 Sarah Chen           │ ← Light YELLOW background
│ 2025-02-09 14:30        │
│                         │
│ 这个按钮需要改成圆角    │
│                         │
└─────────────────────────┘
```

---

## 🎯 Your Workflow

### Scenario: Design Review with Chinese Team + English Devs

**1. Designer (You) - Chinese:**

```
Action:
- Design interface
- Add comment: "这个按钮的hover效果需要添加"
- Post comment

Result:
- Sticky appears on canvas (red tint)
- Stored as:
  EN: "This button needs a hover effect"
  ZH: "这个按钮的hover效果需要添加"
```

**2. Developer (English speaker):**

```
Action:
- Opens Figma
- Sees plugin UI: "🔴 1 unread"
- Toggles language to English
- Clicks comment in list

Result:
- Jumps to sticky on canvas
- Sees: "This button needs a hover effect"
- Marks as read
- Implements feature
```

**3. Developer replies:**

```
Action:
- Clicks "Reply" on comment
- Types: "Added! Check the new variant"
- Posts reply

Result:
- Reply sticky appears below original
- You toggle to Chinese
- See reply: "已添加！查看新变体"
```

**Zero language barrier!**

---

## 📋 Features Breakdown

### ✅ Custom Stickies
- Not native Figma comments
- Created as Figma STICKY nodes
- Store bilingual data in pluginData
- Positioned on canvas for visibility

### ✅ Read/Unread Tracking
- Per-user tracking (uses clientStorage)
- Author auto-marks as read
- Others see as unread initially
- Click or mark to mark as read

### ✅ Visual Indicators
- **🔴 Red dot** in plugin UI list
- **Red tint** on canvas (unread)
- **Yellow tint** on canvas (read)
- **Badge** with unread count

### ✅ Reply Threading
- Click "Reply" on any comment
- Reply sticky positioned below parent
- Visual indent in plugin UI
- Stored relationship (replyTo field)

### ✅ Bilingual Support
- Stores English + Chinese
- Toggle view instantly
- Per-user language preference
- Professional AI translation

### ✅ Team Collaboration
- Each user has their own language
- Read/unread status per user
- Jump to comments on canvas
- Mark all as read

---

## 🔧 Technical Details

### Data Structure:

**Stored in each sticky's pluginData:**
```json
{
  "bilingualComment": {
    "en": "This button needs rounded corners",
    "zh": "这个按钮需要改成圆角",
    "author": "Sarah Chen",
    "timestamp": "2025-02-09T14:30:00Z",
    "replyTo": null
  }
}
```

**User's read status (clientStorage):**
```json
{
  "readComments": ["sticky-id-1", "sticky-id-2", ...],
  "userLanguage": "en"
}
```

### How Toggle Works:

1. Read pluginData from sticky
2. Extract EN or ZH text based on preference
3. Update sticky's visible text
4. No network call = instant!

### How Replies Work:

1. Get parent sticky position
2. Create new sticky below (parent.y + parent.height + 20)
3. Store replyTo: parent.id in data
4. Visual indent in UI

---

## 📊 Comparison

### Native Figma Comments:
- ❌ Cannot be translated via API
- ❌ No read/unread tracking
- ❌ No custom behaviors
- ❌ Language barrier remains

### Bilingual Comments Plugin:
- ✅ Custom stickies with full control
- ✅ Bilingual support built-in
- ✅ Read/unread tracking
- ✅ Visual indicators (red dots, tints)
- ✅ Reply threading
- ✅ Jump to comments
- ✅ Perfect team collaboration!

---

## 🎨 UI Walkthrough

### Plugin Interface:

```
┌─────────────────────────────────┐
│ 💬 Bilingual Comments           │
│ Team collaboration with instant │
│ translation                     │
│ ✓ Connected                     │
├─────────────────────────────────┤
│ Viewing in  🇬🇧 English         │
│                        [中文]    │
├─────────────────────────────────┤
│ [Type your comment...]          │
│                                 │
│ [💬 Post Comment]               │
├─────────────────────────────────┤
│ Comments             🔴 2       │
│                [Mark all read]  │
├─────────────────────────────────┤
│ 🔴 Sarah Chen      2 min ago    │
│    This button needs rounded... │
│    📍 Jump to ↩️ Reply ✓ Read  │
│                                 │
│   Alice (Reply)    1 min ago    │
│   Got it, will fix              │
│   📍 Jump to ↩️ Reply           │
│                                 │
│ 📝 Mike Johnson    10 min ago   │
│    Looks great!                 │
│    📍 Jump to ↩️ Reply           │
└─────────────────────────────────┘
```

---

## 💪 Perfect For:

### ✅ Bilingual Teams
- Chinese designers + English devs
- Annotate in your language
- Team sees in theirs

### ✅ Design Reviews
- Add feedback comments
- Reply to discussions
- Track what's been addressed (read/unread)

### ✅ Internal Iteration
- Comment before dev handoff
- Mark issues for fixing
- Thread conversations

### ✅ Async Collaboration
- Leave comments anytime
- Team sees unread count
- Jump to unaddressed items

---

## 🚀 Advanced Features

### Jump to Comment:
- Click comment in list
- Viewport scrolls to sticky
- Sticky gets selected
- Auto-marked as read

### Mark All as Read:
- One click clears all unreads
- Useful after team review
- Resets visual indicators

### Language Preference:
- Saved per user
- Persists across sessions
- Auto-applies on file open

### Reply Positioning:
- Smart positioning below parent
- Handles multiple replies
- Visual threading on canvas

---

## 📝 Examples

### Example 1: Button Feedback

**Chinese Designer:**
```
Comment: "这个按钮的圆角太小了，改成8px"
```

**English Dev sees:**
```
Comment: "This button's border radius is too small, change to 8px"

Action: Implements fix

Reply: "Updated to 8px radius"
```

**Chinese Designer sees reply:**
```
Reply: "已更新为8px圆角"
```

---

### Example 2: Missing Feature

**Chinese Designer:**
```
Comment: "loading状态缺失，需要添加spinner"
```

**English Dev sees:**
```
Comment: "Loading state is missing, need to add spinner"

Reply: "Added spinner component in loading variant"
```

**Done!** No translation friction.

---

## 🎊 Summary

**Your exact request:**
> "Create custom stickies that can be added to the canvas that we can use as 'comments', and that can be marked as read or unread, where the unread ones have a red dot and are shown inside of the UI. Add a reply button that will paste a separate sticky under the last one."

**What you got:**
✅ Custom bilingual sticky notes
✅ Read/unread tracking (per user)
✅ **Red dot 🔴** for unread in UI
✅ **Red tint** on canvas for unread
✅ Reply button → sticky below parent
✅ Language toggle (EN ↔ CN)
✅ Jump to comments
✅ Mark all as read
✅ Perfect team collaboration!

**PLUS bonuses:**
✅ Instant language switching
✅ AI-powered translation
✅ Visual threading
✅ Unread count badge
✅ Professional workflow

---

**Your bilingual team collaboration: SOLVED!** 💬

Start bridge server and start commenting! 🚀
