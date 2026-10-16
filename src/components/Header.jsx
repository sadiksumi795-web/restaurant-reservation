export default function Header({ page, onNavigate, bookingCount }) {
  return (
    <header className="header">
      <div className="brand">🍽️ TableTime</div>
      <nav aria-label="Main navigation">
        <button className={page === 'home' ? 'nav-button active' : 'nav-button'} onClick={() => onNavigate('home')}>Restaurants</button>
        <button className={page === 'bookings' ? 'nav-button active' : 'nav-button'} onClick={() => onNavigate('bookings')}>
          My Bookings <span className="count">{bookingCount}</span>
        </button>
      </nav>
    </header>
  )
}
