# Spec: Sticky Note Toolbar — Miro-Style Menu Bar with Color Picker

## Overview

Redesign the sticky note toolbar from a flat color grid into a Miro-style horizontal menu bar with a color picker popover, edit, and delete actions.

## Current Behavior

When a sticky note is selected, a toolbar appears above it showing all 23 color circles in a wrapped grid (max-width 200px). No other actions are available in the toolbar.

## Proposed Design

### Menu Bar (appears on node select)

A compact horizontal bar with icon buttons, floating above the selected sticky note.

```
┌───────────────────────────┐
│  [●]   [✏]   [🗑]        │
└───────────────────────────┘
   ▲      ▲      ▲
   │      │      └─ Delete note
   │      └──────── Edit note (enter text editing)
   └─────────────── Color indicator (current color, toggles palette)
```

**Specs:**
- Background: `white`
- Border radius: `8px`
- Box shadow: `0 2px 8px rgba(0, 0, 0, 0.15)`
- Padding: `4px 8px`
- Gap between buttons: `4px`
- Button size: `28px × 28px`, border-radius `4px`
- Button hover: `background-color: #f0f0f0`
- Position: `NodeToolbar` at `Position.Top`, offset `8px`
- Visibility: shown when node is **selected** and **not editing**

### Color Indicator Button

- Displays a `16px` filled circle with the current card's border color
- Border: `2px solid` with the card's accent color
- On click: toggles the color palette popover

### Color Palette Popover (opens on color dot click)

A dropdown grid of color swatches appearing below the menu bar.

```
┌──────────────────────────────┐
│  ●  ●  ●  ●  ●  ●          │  Row 1: purple, darkPurple, indigo, brightBlue, blue, lightBlue
│  ●  ●  ●  ●  ●  ●          │  Row 2: cyan, teal, green, lightGreen, lime, yellow
│  ●  ●  ●  ●  ●  ●          │  Row 3: amber, orange, deepOrange, red, pink, brown
│  ●  ●  ●  ●  ●  ●          │  Row 4: darkCyan, black, light-black, dark-gray, gray, light-gray
└──────────────────────────────┘
```

**Specs:**
- Layout: `display: grid`, `grid-template-columns: repeat(6, 1fr)`
- Gap: `4px`
- Padding: `8px`
- Background: `white`
- Border radius: `8px`
- Box shadow: `0 4px 12px rgba(0, 0, 0, 0.15)`
- Position: `absolute`, below the menu bar
- Color swatch size: `24px × 24px`, `border-radius: 50%`
- Swatch border: `2px solid {color}`
- Swatch fill: `{backgroundColor}`
- Selected indicator: `outline: 2px solid {color}`, `outline-offset: 2px`
- Hover: slight scale `transform: scale(1.15)`
- Dismiss: on color select, or click outside the popover
- Total colors: **24** (6 columns × 4 rows)

### New Color Added

| Name   | Border Color | Background Color |
|--------|-------------|-----------------|
| indigo | `#3949ab`   | `#c5cae9`       |

Inserted after `darkPurple` in the `StickyNoteColors` array.

### Edit Button

- Icon: `RiPencilLine` from `react-icons/ri`, size `16px`
- On click: triggers editing mode by calling `updateNodeData(id, { doubleClicked: true })`

### Delete Button

- Icon: `RiDeleteBinLine` from `react-icons/ri`, size `16px`
- On click: calls `deleteElements({ nodes: [{ id }] })` from `useReactFlow()`

## Interaction Flow

```
User selects sticky note
  → Menu bar appears above node
  → User clicks color dot
    → Color palette popover opens below menu bar
    → User clicks a color swatch
      → Card color updates immediately
      → Popover closes
  → User clicks edit icon
    → Node enters text editing mode
    → Menu bar hides (editing state)
  → User clicks delete icon
    → Node is removed from the board
  → User clicks elsewhere / deselects
    → Menu bar disappears
    → Color popover closes (if open)
```

## Files Modified

| File | Change |
|------|--------|
| `src/constants/sticky-note-colors.ts` | Add `indigo` color entry (24th color) |
| `src/components/xyflow/StickyNote.tsx` | Redesign NodeToolbar as menu bar + color popover |

## Color Palette (24 colors, 6×4 grid)

| Row | Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 |
|-----|-------|-------|-------|-------|-------|-------|
| 1   | purple | darkPurple | indigo | brightBlue | blue | lightBlue |
| 2   | cyan | teal | green | lightGreen | lime | yellow |
| 3   | amber | orange | deepOrange | red | pink | brown |
| 4   | darkCyan | black | light-black | dark-gray | gray | light-gray |

> Note: `indigo` added as the 24th color. `white` removed from palette (blends with board background).
