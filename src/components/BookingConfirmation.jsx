export default function BookingConfirmation({ booking, onViewBookings, onHome }) {
  if (!booking) return null
  return (
    <section className="panel confirmation" role="status">
      <div className="success-icon">✓</div>
      <h2>Reservation confirmed!</h2>
      <p>Your table has been reserved successfully.</p>
      <div className="booking-summary">
        <p><strong>Restaurant:</strong> {booking.restaurantName}</p>
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Guests:</strong> {booking.guests}</p>
        <p><strong>Table:</strong> {booking.table}</p>
      </div>
      <button onClick={onViewBookings}>View my bookings</button>
      <button className="secondary-button" onClick={onHome}>Back to restaurants</button>
    </section>
  )
}
