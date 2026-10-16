
const STORAGE_KEY = "restaurant-reservations";

export function getBookings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error loading bookings:", error);
    return [];
  }
}

export function saveBookings(bookings) {
  try {
    const safeBookings = Array.isArray(bookings) ? bookings : [];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(safeBookings)
    );
  } catch (error) {
    console.error("Error saving bookings:", error);
  }
}
