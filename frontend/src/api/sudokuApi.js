

const BASE_URL = import.meta.env.VITE_API_URL;



export async function generateSudoku(difficulty = "easy") {
  const res = await fetch(`${BASE_URL}/generate?difficulty=${difficulty}`);
  return res.json();
}

export async function generateDailySudoku(date) {
  const query = date ? `?date=${date}` : "";
  const res = await fetch(`${BASE_URL}/daily${query}`);
  return res.json();
}
