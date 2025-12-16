export default function SudokuCell({
  value,
  row,
  col,
  selected,
  onSelect,
  invalid,
  notes,
  isOriginal,
  highlightSame
}) {
  const isSelected =
    selected && selected.row === row && selected.col === col;

  const noteSet = notes instanceof Set ? notes : new Set();

  const borders = `
    ${row % 3 === 0 ? "border-t-2" : "border-t"}
    ${col % 3 === 0 ? "border-l-2" : "border-l"}
    ${row === 8 ? "border-b-2" : "border-b"}
    ${col === 8 ? "border-r-2" : "border-r"}
  `;

  return (
    <div
      onClick={!isOriginal ? onSelect : undefined}
      className={`
        relative
        w-10 h-10
        flex items-center justify-center
        text-lg font-semibold
        border border-gray-700 ${borders}
        cursor-${isOriginal ? "default" : "pointer"}
${isSelected ? "ring-2 ring-blue-600 bg-blue-300 text-white" : ""}
        ${isOriginal ? "text-black" : "text-blue-700"}
${invalid ? "bg-red-300" : ""}
${highlightSame && !isSelected ? "bg-blue-100" : ""}
${!highlightSame && !invalid && isOriginal ? "bg-gray-200" : ""}
${!highlightSame && !invalid && !isOriginal ? "bg-white" : ""}

      `}
    >
      {/* Pencil Notes (always rendered) */}
      <div
        className={`
          absolute inset-0
          grid grid-cols-3 grid-rows-3
          text-xs text-gray-600
          pointer-events-none
          ${value !== 0 ? "opacity-0" : "opacity-100"}
        `}
      >
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <span
            key={n}
            className="flex items-center justify-center"
          >
            {noteSet.has(n) ? n : ""}
          </span>
        ))}
      </div>

      {/* Main Value */}
      {value !== 0 && (
        <span className="relative z-10">
          {value}
        </span>
      )}
    </div>
  );
}
