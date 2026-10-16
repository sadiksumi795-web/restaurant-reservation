import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import RestaurantCard from './components/RestaurantCard.jsx'
import RestaurantDetails from './components/RestaurantDetails.jsx'
import ReservationForm from './components/ReservationForm.jsx'
import BookingConfirmation from './components/BookingConfirmation.jsx'
import MyBookings from './components/MyBookings.jsx'
import { restaurants } from './data/restaurants.js'
import { getBookings, saveBookings } from './utils/storage.js'

export default function App() {
  const [page, setPage] = useState('home')
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('All')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [mode, setMode] = useState('list')
  const [bookings, setBookings] = useState(() => getBookings())
  const [lastBooking, setLastBooking] = useState(null)

  useEffect(() => { saveBookings(bookings) }, [bookings])

  const filteredRestaurants = useMemo(() => restaurants.filter((restaurant) => {
    const query = search.toLowerCase()
    const matchesSearch = restaurant.name.toLowerCase().includes(query) || restaurant.cuisine.toLowerCase().includes(query)
    return matchesSearch && (cuisine === 'All' || restaurant.cuisine === cuisine)
  }), [search, cuisine])

  function selectRestaurant(restaurant) {
    setSelectedRestaurant(restaurant)
    setMode('details')
  }

  function createBooking(booking) {
    setBookings((current) => [booking, ...current])
    setLastBooking(booking)
    setMode('confirmation')
  }

  function navigate(nextPage) {
    setPage(nextPage)
    setMode('list')
    setSelectedRestaurant(null)
  }

  function removeBooking(id) {
    setBookings((current) => current.filter((booking) => booking.id !== id))
  }

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} bookingCount={bookings.length} />
      <main className="main-content">
        {page === 'bookings' ? (
          <MyBookings bookings={bookings} onRemove={removeBooking} onExplore={() => navigate('home')} />
        ) : mode === 'confirmation' ? (
          <BookingConfirmation booking={lastBooking} onViewBookings={() => navigate('bookings')} onHome={() => navigate('home')} />
        ) : mode === 'form' && selectedRestaurant ? (
          <ReservationForm restaurant={selectedRestaurant} onSubmit={createBooking} onCancel={() => setMode('details')} />
        ) : mode === 'details' && selectedRestaurant ? (
          <RestaurantDetails restaurant={selectedRestaurant} onBack={() => setMode('list')} onBook={() => setMode('form')} />
        ) : (
          <>
            <section className="hero">
              <p className="eyebrow">GOOD FOOD. GREAT COMPANY.</p>
              <h1>Find your table.</h1>
              <p>Discover a place you love and reserve your next meal.</p>
            </section>
            <SearchBar search={search} onSearch={setSearch} cuisine={cuisine} onCuisineChange={setCuisine} />
            <div className="section-heading"><div><p className="eyebrow">HANDPICKED FOR YOU</p><h2>Popular restaurants</h2></div><span>{filteredRestaurants.length} places</span></div>
            {filteredRestaurants.length ? (
              <div className="restaurant-grid">
                {filteredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} onSelect={selectRestaurant} />)}
              </div>
            ) : <div className="panel empty-state"><h2>No restaurants found</h2><p>Try another name or cuisine.</p><button onClick={() => { setSearch(''); setCuisine('All') }}>Clear filters</button></div>}
          </>
        )}
      </main>
      <footer className="footer">TableTime · Restaurant Reservation App</footer>
    </div>
  )
}
