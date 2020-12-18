export default async function sWAPI() {
  const RESPONSE = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await RESPONSE.json();
  const SORTED_DATA = data.results.sort((a, b) => a.name.localeCompare(b.name));
  return SORTED_DATA;
}
