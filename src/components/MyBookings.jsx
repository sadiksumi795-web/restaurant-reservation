export default function MyBookings({ bookings, onRemove, onExplore }) {
  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">YOUR PLANS</p><h1>My Bookings</h1></div></div>
      {bookings.length === 0 ? (
        <div className="panel empty-state"><div>🗓️</div><h2>No bookings yet</h2><p>Your confirmed reservations will appear here.</p><button onClick={onExplore}>Explore restaurants</button></div>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <article className="booking-card" key={booking.id}>
              <div className="booking-icon">🍽️</div>
              <div className="booking-content">
                <h2>{booking.restaurantName}</h2>
                <p>{booking.date} at {booking.time}</p>
                <p>{booking.guests} guest(s) · {booking.table}</p>
                <p className="muted">Booked by {booking.name}</p>
              </div>
              <button className="danger-button" onClick={() => onRemove(booking.id)}>Cancel</button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
