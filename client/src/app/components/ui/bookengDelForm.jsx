import React, { useEffect, useState } from "react";
import axios from "axios";
import cookieService from "../../service/cookie.service";
// Путь к вашему файлу cookieService

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = cookieService.getAccessToken();
        const response = await axios.get("http://localhost:8080/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = cookieService.getAccessToken();
      await axios.delete(`/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert("Booking cancelled!");
    } catch (error) {
      alert("Failed to cancel booking!");
    }
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            Room: {booking.room.name}, Start: {booking.startDate}, End:{" "}
            {booking.endDate}
            <button onClick={() => handleCancelBooking(booking._id)}>
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
