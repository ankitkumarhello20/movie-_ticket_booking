import React, {useEffect, useState} from 'react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const base = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch(`${base}/user/bookings`, {headers: { Authorization: `Bearer ${token}`}});
    if (res.ok) {
      const data = await res.json();
      setBookings(data);
    }
  }

  useEffect(()=>{ fetchBookings() }, []);

  if (!localStorage.getItem('token')) return <div style={{padding:20}}>Please <a href="/login">login</a> to view booking history.</div>

  return (
    <div style={{padding:20}}>
      <h2>Your Bookings</h2>
      {bookings.length===0 ? <div>No bookings yet</div> : (
        <ul>
          {bookings.map(b=> (
            <li key={b.booking_id}>Booking #{b.booking_id} - {b.movie_name} - seat {b.seat_id} - {new Date(b.created_at).toLocaleString()}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookingHistory;
