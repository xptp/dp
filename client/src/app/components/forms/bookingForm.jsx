import React, { useState, useEffect } from "react";
import axios from "axios";
import cookieService from "../../service/cookie.service";
import { addDays, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";

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
  const [excludeDates, setExcludeDates] = useState([]);
  const [userBooked, setUserBooked] = useState([]);

  const location = useLocation();
  const isUserPage = location.pathname.includes("/user");

  useEffect(() => {
    const fetchExcludeDates = async () => {
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

      const bookedDates = response.data.bookedDates.map(
        (date) => new Date(date)
      );
      const currentUserBookedDates = response.data.bookedDates
        .filter((booking) => booking.userId === cookieService.getUserId())
        .map((date) => new Date(date));
      setUserBooked(currentUserBookedDates);

      // setExcludeDates(response.data.bookedDates.map((date) => new Date(date)));
      setExcludeDates(bookedDates);
    };

    fetchExcludeDates();
  }, [roomId]);

  const handleBooking = async () => {
    const accessToken = cookieService.getAccessToken();

    const bookingData = {
      roomId,
      checkInDate: format(checkInDate, "yyyy-MM-dd"),
      checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
    };
    if (!accessToken) {
      alert("Вы должны быть авторизованы,");
    }

    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const getExcDate = () => {
    if (isUserPage) {
      return excludeDates.filter(
        (date) =>
          !userBooked.some((userDate) => userDate.getTime() === date.getTime())
      );
    }
    return excludeDates;
  };

  return (
    <div className={bookClassName}>
      <div className="test">
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          minDate={minDate}
          excludeDates={getExcDate()}
          inline
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          minDate={checkInDate}
          excludeDates={getExcDate()}
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
