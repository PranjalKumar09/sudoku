const BASE_URL = "http://localhost:8080/api/sudoku";

export async function generateSudoku(difficulty = "easy") {
  const res = await fetch(`${BASE_URL}/generate?difficulty=${difficulty}`);
  return res.json();
}


export async function generateDailySudoku() {
  const res = await fetch(`${BASE_URL}/daily`);
  return res.json();
}