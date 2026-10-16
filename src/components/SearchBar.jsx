export default function SearchBar({ search, onSearch, cuisine, onCuisineChange }) {
  return (
    <section className="search-row" aria-label="Restaurant search">
      <input
        aria-label="Search restaurants"
        placeholder="Search restaurant or cuisine..."
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      />
      <select aria-label="Filter by cuisine" value={cuisine} onChange={(event) => onCuisineChange(event.target.value)}>
        <option value="All">All cuisines</option>
        <option>Indian</option><option>Italian</option><option>Japanese</option>
        <option>American</option><option>Healthy</option><option>Mexican</option>
        <option>Chinese</option><option>Bakery</option><option>Seafood</option>
      </select>
    </section>
  )
}
