export default function RestaurantDetails({ restaurant, onBack, onBook }) {
  if (!restaurant) return null
  return (
    <section className="panel">
      <button className="text-button" onClick={onBack}>← Back to restaurants</button>
      <div className="detail-hero"><span>{restaurant.emoji}</span><div>
        <h2>{restaurant.name}</h2><p>{restaurant.cuisine} · {restaurant.price} · ★ {restaurant.rating}</p>
      </div></div>
      <p>{restaurant.description}</p>
      <h3>Reserve your table</h3>
      <p>Select your preferred date, time and table in the booking form.</p>
      <button onClick={onBook}>Continue to booking</button>
    </section>
  )
}
