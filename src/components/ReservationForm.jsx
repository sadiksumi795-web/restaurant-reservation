import { useState } from 'react'
import TableSelection from './TableSelection.jsx'

export default function ReservationForm({ restaurant, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('18:00')
  const [guests, setGuests] = useState('2')
  const [table, setTable] = useState('Table 1')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !date || !time || !table) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (date < new Date().toLocaleDateString('en-CA')) {
      setError('Please choose today or a future date.')
      return
    }
    onSubmit({
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name: name.trim(), email: email.trim(), date, time,
      guests: Number(guests), table
    })
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <button type="button" className="text-button" onClick={onCancel}>← Back</button>
      <h2>Book at {restaurant.name}</h2>
      <label className="field">Your name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      </label>
      <label className="field">Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      <div className="two-columns">
        <label className="field">Date
          <input aria-label="Date" type="date" min={new Date().toLocaleDateString('en-CA')} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="field">Time
          <select aria-label="Time" value={time} onChange={(e) => setTime(e.target.value)}>
            {['10:00','12:00','14:00','16:00','18:00','20:00'].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <label className="field">Number of guests
        <select aria-label="Number of guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
          {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
        </select>
      </label>
      <TableSelection value={table} onChange={setTable} />
      {error && <p role="alert" className="error">{error}</p>}
      <button type="submit" className="full-button">Confirm reservation</button>
    </form>
  )
}
