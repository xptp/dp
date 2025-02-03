import React, { useState, useEffect } from "react";
import axios from "axios";
import cookieService from "../../service/cookie.service";
import { addDays, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({
  roomId,
  bookClassName,
  initialCheckInDate,
  initialCheckOutDate,
  bookingId,
  update,
}) => {
  const [checkInDate, setCheckInDate] = useState(
    initialCheckInDate || new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState(
    initialCheckOutDate || addDays(new Date(), 1)
  );
  const [minDate, setMinDate] = useState(new Date());

  // useEffect(() => {
  //   const fetchExcludeDates = async () => {
  //     const accessToken = cookieService.getAccessToken();
  //     const response = await axios.get(
  //       `http://localhost:8080/api/book/get-booked-dates`,
  //       {
  //         params: {
  //           roomId,
  //         },
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     setExcludeDates(response.data.bookedDates.map((date) => new Date(date)));
  //   };

  //   fetchExcludeDates();
  // }, [roomId]);

  const handleBooking = async () => {
    const accessToken = cookieService.getAccessToken();
    const bookingData = {
      roomId,
      checkInDate: format(checkInDate, "yyyy-MM-dd"),
      checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
    };

    if (bookingId) {
      await axios.put(
        `http://localhost:8080/api/book/${bookingId}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      update(bookingData);
    } else {
      await axios.post("http://localhost:8080/api/book/", bookingData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  };

  return (
    <div className={bookClassName}>
      <div className="test">
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          minDate={minDate}
          // excludeDates={excludeDates}
          inline
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          minDate={checkInDate}
          // excludeDates={excludeDates}
          inline
        />
      </div>
      <button onClick={handleBooking} className="book-btn">
        {bookingId ? "Обновить бронь" : "Забронировать"}
      </button>
    </div>
  );
};

export default BookingForm;
