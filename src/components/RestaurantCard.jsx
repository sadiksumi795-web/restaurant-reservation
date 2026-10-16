export default function RestaurantCard({ restaurant, onSelect }) {
  return (
    <article className="restaurant-card">
      <div className="restaurant-emoji" aria-hidden="true">{restaurant.emoji}</div>
      <div className="restaurant-info">
        <h2>{restaurant.name}</h2>
        <p className="muted">{restaurant.cuisine} · {restaurant.price}</p>
        <p>{restaurant.description}</p>
        <p className="rating">★ {restaurant.rating}</p>
        <button onClick={() => onSelect(restaurant)}>View details & book</button>
      </div>
    </article>
  )
}
