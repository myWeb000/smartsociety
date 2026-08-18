import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getErrorMessage } from '../../api/client';
import { useData } from '../../context/DataContext';

const AmenityBooking = () => {
  const { bookAmenity } = useData();
  const [amenity, setAmenity] = useState('Clubhouse');
  const [date, setDate] = useState('');
  const handleBook = async (event) => {
    event.preventDefault();
    try {
      await bookAmenity({ amenity, date });
      setDate('');
      Swal.fire({ icon: 'success', title: 'Amenity booked', text: `${amenity} has been booked for ${date}.` });
    } catch (error) { Swal.fire({ icon: 'error', title: 'Booking failed', text: getErrorMessage(error) }); }
  };
  return <div><div className="mb-4"><h2 className="fw-bold mb-1">Amenity Booking</h2><p className="text-muted mb-0">Book an available society amenity.</p></div><div className="society-card"><form onSubmit={handleBook} className="row g-3"><div className="col-md-6"><label className="form-label">AMENITY</label><select className="form-select" value={amenity} onChange={(e) => setAmenity(e.target.value)}><option>Clubhouse</option><option>Swimming Pool</option><option>Gym</option></select></div><div className="col-md-6"><label className="form-label">BOOKING DATE</label><input required type="date" min={new Date().toISOString().slice(0, 10)} className="form-control" value={date} onChange={(e) => setDate(e.target.value)} /></div><div className="col-12 text-end"><button className="btn btn-society-red">Book Amenity</button></div></form></div></div>;
};
export default AmenityBooking;
