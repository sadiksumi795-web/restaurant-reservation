import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'

describe('Restaurant Reservation Components', () => {
  beforeEach(() => localStorage.clear())

  it('renders restaurant cards', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Popular restaurants' })).toBeInTheDocument()
    expect(screen.getByText('Spice Garden')).toBeInTheDocument()
    expect(screen.getByText('Pasta Corner')).toBeInTheDocument()
  })

  it('searches restaurants by name', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Search restaurants'), 'Sushi')
    expect(screen.getByText('Sushi House')).toBeInTheDocument()
    expect(screen.queryByText('Pasta Corner')).not.toBeInTheDocument()
  })

  it('filters restaurants by cuisine', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.selectOptions(screen.getByLabelText('Filter by cuisine'), 'Italian')
    expect(screen.getByText('Pasta Corner')).toBeInTheDocument()
    expect(screen.queryByText('Spice Garden')).not.toBeInTheDocument()
  })

  it('opens restaurant details', async () => {
    const user = userEvent.setup()
    render(<App />)
    const card = screen.getByText('Spice Garden').closest('article')
    await user.click(within(card).getByRole('button', { name: /view details/i }))
    expect(screen.getByText('Reserve your table')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue to booking/i })).toBeInTheDocument()
  })

  it('shows validation when booking form is empty', async () => {
    const user = userEvent.setup()
    render(<App />)
    const card = screen.getByText('Spice Garden').closest('article')
    await user.click(within(card).getByRole('button', { name: /view details/i }))
    await user.click(screen.getByRole('button', { name: /continue to booking/i }))
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }))
    expect(screen.getByRole('alert')).toHaveTextContent('Please fill in all fields.')
  })

  it('confirms a valid reservation and shows it in My Bookings', async () => {
    const user = userEvent.setup()
    render(<App />)
    const card = screen.getByText('Spice Garden').closest('article')
    await user.click(within(card).getByRole('button', { name: /view details/i }))
    await user.click(screen.getByRole('button', { name: /continue to booking/i }))
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Mika')
    await user.type(screen.getByPlaceholderText('you@example.com'), 'mika@example.com')
    const dateInput = screen.getByLabelText('Date')
    fireEvent.change(dateInput, { target: { value: '2099-12-25' } })
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }))
    expect(screen.getByRole('heading', { name: /reservation confirmed/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /view my bookings/i }))
    expect(screen.getByRole('heading', { name: 'My Bookings' })).toBeInTheDocument()
    expect(screen.getByText('Spice Garden')).toBeInTheDocument()
    expect(screen.getByText(/Booked by Mika/)).toBeInTheDocument()
  })

  it('shows an empty state on My Bookings when no reservation exists', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /my bookings/i }))
    expect(screen.getByText('No bookings yet')).toBeInTheDocument()
  })

  it('cancels a booking from My Bookings', async () => {
    const user = userEvent.setup()
    localStorage.setItem('restaurant-reservations', JSON.stringify([{
      id: 'test-1', restaurantId: 1, restaurantName: 'Spice Garden', name: 'Mika',
      email: 'mika@example.com', date: '2099-12-25', time: '18:00', guests: 2, table: 'Table 1'
    }]))
    render(<App />)
    await user.click(screen.getByRole('button', { name: /my bookings/i }))
    expect(screen.getByText('Spice Garden')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    expect(screen.getByText('No bookings yet')).toBeInTheDocument()
  })
})
