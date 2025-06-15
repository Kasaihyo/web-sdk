// Convert 7x7 board data to 5x5 for Esqueleto

// Symbol mapping from cluster to esqueleto
const symbolMap: Record<string, string> = {
  'H1': 'LDY', // Lady Skull (highest)
  'H2': 'PNK', // Pink Skull
  'H3': 'GRN', // Green Skull
  'H4': 'BLU', // Blue Skull
  'L1': 'ORG', // Orange Skull (low)
  'L2': 'CYN', // Cyan Skull (low)
  'L3': 'CYN', // Also map L3 to CYN since esqueleto only has 2 low-pay symbols
  'W': 'WLD',  // Wild
  'S': 'SCR',  // Scatter
  // Also handle any multiplier wilds
  'W_2': 'WLD',
  'W_3': 'WLD',
  'W_5': 'WLD',
};

function convertSymbol(symbol: { name: string }): { name: string } {
  return {
    ...symbol,
    name: symbolMap[symbol.name] || symbol.name
  };
}

function convertBoard(board: any[][]): any[][] {
  if (!Array.isArray(board) || board.length !== 7) {
    return board;
  }
  
  // Take the center 5 columns (skip first and last column)
  // Keep ALL 9 rows (7 visible + 2 padding for 7x7, which becomes 5 visible + 2 padding for 5x5)
  // But we need to take the middle 7 rows from the 9 rows
  return board.slice(1, 6).map(column => {
    // From 9 rows, take middle 7 (skip first and last)
    const middleRows = column.slice(1, 8);
    return middleRows.map(convertSymbol);
  });
}

function convertPosition(pos: any): any {
  // Convert 7x7 positions (0-6) to 5x5 positions (0-4)
  // Take positions 1-5 from the 7x7 grid and map to 0-4 in 5x5
  if (pos.reel >= 1 && pos.reel <= 5 && pos.row >= 1 && pos.row <= 5) {
    return {
      reel: pos.reel - 1,
      row: pos.row - 1
    };
  }
  return null;
}

function convertBookData(book: any): any {
  return {
    ...book,
    events: book.events.map((event: any) => {
      if (event.type === 'reveal' && event.board) {
        return {
          ...event,
          board: convertBoard(event.board),
          // Adjust padding positions if present
          paddingPositions: event.paddingPositions?.map((p: number) => Math.max(0, Math.min(p, 4)))
        };
      } else if (event.type === 'winInfo' && event.wins) {
        return {
          ...event,
          wins: event.wins.map((win: any) => ({
            ...win,
            positions: win.positions?.map(convertPosition).filter(Boolean) || [],
            meta: win.meta ? {
              ...win.meta,
              overlay: win.meta.overlay ? convertPosition(win.meta.overlay) : undefined
            } : undefined
          }))
        };
      } else if (event.type === 'tumbleBoard' && event.newSymbols) {
        return {
          ...event,
          newSymbols: convertBoard(event.newSymbols),
          // Also need to adjust exploding positions
          // Cluster uses 0-based indexing, so positions 1-5 in 7x7 become 0-4 in 5x5
          explodingSymbols: event.explodingSymbols?.filter((pos: any) => 
            pos.reel >= 1 && pos.reel <= 5 && pos.row >= 1 && pos.row <= 5
          ).map((pos: any) => ({
            reel: pos.reel - 1, // Adjust from 7x7 (1-5) to 5x5 (0-4)
            row: pos.row - 1
          }))
        };
      } else if (event.type === 'freeSpinTrigger' && event.positions) {
        return {
          ...event,
          positions: event.positions?.map(convertPosition).filter(Boolean) || []
        };
      }
      return event;
    })
  };
}

// Import and convert the data
import baseBooks from './base_books';
import bonusBooks from './bonus_books';

export const convertedBaseBooks = baseBooks.map(convertBookData);
export const convertedBonusBooks = bonusBooks.map(convertBookData);

// Debug: Log the conversion
console.log('Original board size:', baseBooks[0]?.events[0]?.board?.length, 'x', baseBooks[0]?.events[0]?.board?.[0]?.length);
console.log('Converted board size:', convertedBaseBooks[0]?.events[0]?.board?.length, 'x', convertedBaseBooks[0]?.events[0]?.board?.[0]?.length);

// Log any winInfo events to debug cluster detection
const firstBook = convertedBaseBooks[0];
if (firstBook) {
  const winInfoEvents = firstBook.events.filter(e => e.type === 'winInfo');
  if (winInfoEvents.length > 0) {
    console.log('WinInfo events found:', winInfoEvents);
  }
}