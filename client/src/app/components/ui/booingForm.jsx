import React, { useState } from "react";
import axios from "axios";
import cookieService from "../../service/cookie.service";

const BookingForm = ({ roomId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = cookieService.getAccessToken();
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/api/bookings",
        { roomId, startDate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Booking successful!");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please log in again.");
      } else {
        alert("Booking failed!");
      }
    }
  };

  return (
    <form onSubmit={handleBooking}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button type="submit">Book Room</button>
    </form>
  );
};

export default BookingForm;
