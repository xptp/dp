import React, { useState, useEffect } from "react";
import axios from "axios";
import cookieService from "../../service/cookie.service";
import { addDays, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ roomId }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));
  const [minDate, setMinDate] = useState(new Date());
  const [excludeDates, setExcludeDates] = useState([]);

  useEffect(() => {
    const fetchExcludeDates = async () => {
      try {
        const accessToken = cookieService.getAccessToken();
        const response = await axios.get(
          `http://localhost:8080/api/book/get-booked-dates`,
          {
            params: {
              roomId,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setExcludeDates(
          response.data.bookedDates.map((date) => new Date(date))
        );
      } catch (error) {
        alert("Error fetching booked dates: " + error.response.data.message);
      }
    };

    fetchExcludeDates();
  }, [roomId]);

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
          checkInDate: format(checkInDate, "yyyy-MM-dd"),
          checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
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
      <DatePicker
        selected={checkInDate}
        onChange={(date) => setCheckInDate(date)}
        minDate={minDate}
        excludeDates={excludeDates}
        inline
      />
      <DatePicker
        selected={checkOutDate}
        onChange={(date) => setCheckOutDate(date)}
        minDate={minDate}
        excludeDates={excludeDates}
        inline
      />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
};

export default BookingForm;
