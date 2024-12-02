import React, { useState } from "react";
import axios from "axios";
import cookieService from "../../service/cookie.service";

const BookingForm = ({ roomId }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleBooking = async () => {
    try {
      const accessToken = cookieService.getAccessToken();
      console.log(accessToken);

      console.log(checkInDate);
      console.log(checkOutDate);
      console.log(roomId);

      await axios.post(
        "http://localhost:8080/api/book/",
        {
          roomId,
          checkInDate,
          checkOutDate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("Booking successful!");
    } catch (error) {
      alert("Booking failed: " + error.response.data.message);
    }
  };

  return (
    <div>
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
      />
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
      />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
};

export default BookingForm;
