import SudokuCell from "./SudokuCell";

export default function SudokuGrid({
  board,
  initialBoard,
  selected,
  setSelected,
  invalidCells,
  notes
}) {
  return (
    <div className="grid grid-cols-9 mt-4">
      {board.map((row, r) =>
        row.map((value, c) => (
          <SudokuCell
            key={`${r}-${c}`}
            value={value}
            row={r}
            col={c}
            selected={selected}
            onSelect={() => setSelected({ row: r, col: c })}
            invalid={invalidCells.has(`${r}-${c}`)}
            notes={notes[`${r}-${c}`]}
            isOriginal={initialBoard[r][c] !== 0}
          />
        ))
      )}
    </div>
  );
}
