# UI Components Summary - Path of Irregulars

## ✅ Completed Components

### In-Game View Components (`/ui`)

1. **`gamecard.tsx`** - Card component for gameplay
   - Features: Hover states, selection states, playable/disabled states, ability indicators
   - Sizes: small, medium, large
   - Props: card, isPlayable, isSelected, isDisabled, onClick, size

2. **`hand.tsx`** - Player's hand display
   - Features: Horizontal scrollable list, card count, mulligan mode support
   - Props: cards, selectedCardIds, isMulliganMode, onCardClick, maxCards

3. **`boardfield.tsx`** - Board area for played cards
   - Features: Displays cards on field, power total, player/opponent distinction
   - Props: cards, owner, totalPower, onCardClick

4. **`gameboard.tsx`** - Main game board container
   - Features: Layout wrapper with gradient background
   - Props: children, className

5. **`turnindicator.tsx`** - Turn indicator component
   - Features: Shows current player, turn number, waiting state
   - Props: currentPlayer, playerName, opponentName, turnNumber, isWaiting

6. **`passbutton.tsx`** - Pass turn button
   - Features: Disabled when not player's turn, hover effects
   - Props: isPlayerTurn, onClick, disabled

7. **`roundscore.tsx`** - Round score display (best of 3)
   - Features: Player vs opponent scores, round indicators, win/loss states
   - Props: playerScore, opponentScore, currentRound, maxRounds, playerName, opponentName

8. **`gameinfo.tsx`** - Game state information
   - Features: Round number, turn number, deck/hand counts
   - Props: roundNumber, turnNumber, cardsInDeck, cardsInHand, opponentCardsInHand

9. **`mulliganphase.tsx`** - Mulligan phase overlay
   - Features: Full-screen overlay, card selection, swap confirmation
   - Props: startingHand, selectedCardIds, onCardToggle, onConfirm, maxSwaps

### Meta View Components (`/ui`)

10. **`cardgrid.tsx`** - Grid layout for card collection
    - Features: Responsive grid, card selection, click handlers
    - Props: cards, onCardClick, selectedCardIds, columns, emptyMessage

11. **`deckcard.tsx`** - Deck display card
    - Features: Deck info, card preview, completion status, actions
    - Props: deck, onEdit, onDelete, showActions

### Pages (`/app/game`)

12. **`page.tsx`** - Main game board page
    - Features: Integrates all game components, mock state (ready for store integration)
    - Structure: Opponent area → Center info → Player area → Hand → Actions

---

## 📋 Component Usage Examples

### Using GameCard
```tsx
import GameCard from '@/ui/gamecard'
import { Card } from '@/domains/collection/collection.types'

<GameCard
  card={card}
  isPlayable={true}
  isSelected={false}
  onClick={() => handleCardClick(card)}
  size="medium"
/>
```

### Using Hand
```tsx
import Hand from '@/ui/hand'

<Hand
  cards={playerHand}
  selectedCardIds={selectedIds}
  isMulliganMode={false}
  onCardClick={handleCardClick}
  maxCards={10}
/>
```

### Using MulliganPhase
```tsx
import MulliganPhase from '@/ui/mulliganphase'

<MulliganPhase
  startingHand={startingHand}
  selectedCardIds={selectedIds}
  onCardToggle={handleToggle}
  onConfirm={handleConfirm}
  maxSwaps={3}
/>
```

---

## 🎨 Styling Notes

- All components use the existing design system (panel, btn, etc.)
- Colors follow the emerald/slate theme
- Components are responsive and mobile-friendly
- Added scrollbar styles to `globals.css` for horizontal scrolling in Hand component

---

## 🔄 Next Steps (State Management Integration)

When you're ready to connect to stores:

1. **Game State Store** - Replace mock state in `app/game/page.tsx` with:
   - Player/opponent cards
   - Hand state
   - Turn state
   - Round state
   - Score state

2. **API Integration** - Add calls to:
   - `startturn` endpoint
   - `playcard` endpoint  
   - `endturn` endpoint

3. **Mulligan Logic** - Connect mulligan phase to backend swap logic

4. **Card Abilities** - Add UI for displaying and triggering card abilities

---

## 📝 Notes

- All components are TypeScript typed
- Components use 'use client' where needed for interactivity
- Mock data is in place for UI testing
- Components follow existing code style and patterns
- No breaking changes to existing components

---

## 🐛 Potential Issues to Watch

1. **Card Component** - The existing `card.tsx` uses different prop structure than `gamecard.tsx`. Consider:
   - Making Card more flexible, OR
   - Keeping them separate (collection vs game views)

2. **Image Loading** - Card images may need Next.js Image optimization later

3. **Responsive Design** - Test on mobile devices for hand scrolling and board layout

4. **Accessibility** - Consider adding ARIA labels and keyboard navigation
