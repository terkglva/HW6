const BASE_URL = "https://rickandmortyapi.com/api/character";

export async function getAll(query = "") {
  const url = query ? `${BASE_URL}/?name=${query}` : BASE_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load");
  const data = await res.json();
  return data.results;
}

export async function getById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return res.json();
}
