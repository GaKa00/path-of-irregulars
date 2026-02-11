# UI Component Analysis - Path of Irregulars

## Current Structure Review

### Existing UI Components (`/ui` folder)
- ✅ `card.tsx` - Basic card component (needs game-specific variant)
- ✅ `gameselector.tsx` - Meta hub navigation
- ✅ `logincard.tsx` - Login UI
- ✅ `metabutton.tsx` - Reusable button for meta views
- ✅ `metafooter.tsx` - Footer for meta pages
- ✅ `navbar.tsx` - Navigation bar
- ✅ `newscard.tsx` - News card component

### Existing Pages
**Meta Views (`/app/meta`):**
- ✅ Collection page
- ✅ Deck builder (newdeck)
- ✅ Leaderboard (placeholder)
- ✅ Profile (placeholder)
- ✅ Packs (placeholder)

**Game Views (`/app/game`):**
- ✅ Deck selection (placeholder)
- ✅ Searching game (placeholder)
- ❌ **MISSING: Main game board page**

---

## Missing UI Components

### 🎮 In-Game View Components (Priority: HIGH)

#### 1. **GameCard Component** (`ui/gamecard.tsx`)
- Purpose: Card component specifically for gameplay
- Features needed:
  - Display card image, name, power, description
  - Hover states for selection
  - Disabled/playable states
  - Visual feedback for selected cards
  - Ability indicators (if card has abilities)

#### 2. **Hand Component** (`ui/hand.tsx`)
- Purpose: Display player's current hand
- Features needed:
  - Horizontal scrollable card list
  - Card count indicator
  - Visual distinction for playable vs unplayable cards
  - Mulligan selection mode

#### 3. **BoardField Component** (`ui/boardfield.tsx`)
- Purpose: Display cards played on the board
- Features needed:
  - Two rows (player's field, opponent's field)
  - Card placement zones
  - Power total display per row
  - Visual separation between rows

#### 4. **GameBoard Component** (`ui/gameboard.tsx`)
- Purpose: Main game area container
- Features needed:
  - Layout for opponent area (top)
  - Layout for player area (bottom)
  - Center game info area
  - Responsive layout

#### 5. **MulliganPhase Component** (`ui/mulliganphase.tsx`)
- Purpose: UI for mulligan phase
- Features needed:
  - Display starting hand
  - Card selection for swapping
  - Confirm button
  - Instructions/guidance

#### 6. **TurnIndicator Component** (`ui/turnindicator.tsx`)
- Purpose: Show whose turn it is
- Features needed:
  - Player name display
  - Turn timer (if applicable)
  - Visual highlight for active player

#### 7. **PassButton Component** (`ui/passbutton.tsx`)
- Purpose: Button to pass turn
- Features needed:
  - Prominent placement
  - Disabled state when not player's turn
  - Confirmation (optional)

#### 8. **RoundScore Component** (`ui/roundscore.tsx`)
- Purpose: Display round scores (best of 3)
- Features needed:
  - Player vs Opponent scores
  - Round indicators (won/lost/pending)
  - Current round highlight

#### 9. **GameInfo Component** (`ui/gameinfo.tsx`)
- Purpose: Display game state information
- Features needed:
  - Round number
  - Turn number
  - Cards remaining in deck
  - Cards in hand count

#### 10. **GamePage Component** (`app/game/page.tsx`)
- Purpose: Main game board page
- Features needed:
  - Integrate all game UI components
  - Handle game state (will connect to stores later)
  - Layout structure

---

### 🏠 Meta View Components (Priority: MEDIUM)

#### 11. **CardGrid Component** (`ui/cardgrid.tsx`)
- Purpose: Display cards in a grid layout for collection
- Features needed:
  - Responsive grid layout
  - Card filtering/sorting (UI only)
  - Hover effects
  - Selection states

#### 12. **DeckCard Component** (`ui/deckcard.tsx`)
- Purpose: Display deck in list/grid view
- Features needed:
  - Deck name
  - Card count
  - Preview of key cards
  - Edit/Delete actions

---

## Component Hierarchy (In-Game View)

```
GamePage
├── GameBoard
│   ├── OpponentArea (top)
│   │   ├── OpponentInfo
│   │   └── BoardField (opponent's cards)
│   ├── CenterArea
│   │   ├── RoundScore
│   │   ├── GameInfo
│   │   └── TurnIndicator
│   └── PlayerArea (bottom)
│       ├── BoardField (player's cards)
│       ├── Hand
│       │   └── GameCard[] (player's hand)
│       └── ActionButtons
│           ├── PassButton
│           └── (other action buttons)
└── MulliganPhase (conditional - shown during mulligan)
    ├── Hand (starting hand)
    └── ConfirmButton
```

---

## Recommendations

1. **Create a `/ui/game` subfolder** for game-specific components to keep organization clean
2. **Create a `/ui/meta` subfolder** for meta-specific components (optional)
3. **Ensure Card component is flexible** - consider making it accept different variants (collection vs game)
4. **Consider creating a GameLayout** similar to MetaLayout for consistent game view structure
5. **Add loading/skeleton states** for components that will fetch data later

---

## Next Steps

1. Create all in-game UI components (priority)
2. Create meta view UI components
3. Create main game page
4. Ensure consistent styling with existing design system
5. Add proper TypeScript types for all components
