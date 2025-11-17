import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Booking = () => {
  const { id } = useParams();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const base = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${base}/seats/${id}`);
      const data = await res.json();
      setSeats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
    // poll for updates
    const t = setInterval(fetchSeats, 5000);
    return () => clearInterval(t);
  }, [id]);

  const bookSeat = async (seatId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book seats');
      window.location.href = '/login';
      return;
    }
    try {
      const res = await fetch(`${base}/book`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ seat_id: seatId }) });
      if (res.ok) {
        await fetchSeats();
        alert('Booked successfully');
      } else {
        const d = await res.json();
        alert('Booking failed: ' + (d.error || res.status));
      }
    } catch (e) {
      alert('Booking failed: ' + e.message);
    }
  };

  if (loading) return <div style={{padding:20}}>Loading seats...</div>;

  if (!seats || seats.length === 0) return (
    <div style={{padding:20}}>
      <Link to="/movies">← Back to movies</Link>
      <h3>No seats found for this movie.</h3>
    </div>
  );

  return (
    <div style={{padding:20}}>
      <Link to="/movies">← Back to movies</Link>
      <h2>Booking for movie {id}</h2>
      <div style={{display:'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', maxWidth:600}}>
        {seats.map(s => (
          <div key={s.seat_id} style={{padding:10, backgroundColor: s.isbooked ? '#e74c3c' : '#2ecc71', color:'white', textAlign:'center', cursor: s.isbooked ? 'not-allowed' : 'pointer'}} onClick={() => !s.isbooked && bookSeat(s.seat_id)}>
            <div style={{fontWeight:'bold'}}>Seat {s.seat_id}</div>
            <div style={{fontSize:12}}>{s.name_seat || ''}</div>
            <div style={{fontSize:11}}>{s.isbooked ? `Booked by ${s.name || 'someone'}` : 'Available'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
