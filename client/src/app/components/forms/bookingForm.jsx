import React, { useState, useEffect } from "react";
import cookieService from "../../service/cookie.service";
import { addDays, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import bookingService from "../../service/booking.service";

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
  const [bookingCreated, setBokingCreated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isUserPage = location.pathname.includes("/user");

  useEffect(() => {
    const fetchExcludeDates = async (roomId) => {
      const response = await bookingService.getBookedDates(roomId);

      const bookedDates = response.data.bookedDates.map(
        (date) => new Date(date)
      );
      const currentUserBookedDates = response.data.bookedDates
        .filter((booking) => booking.userId === cookieService.getUserId())
        .map((date) => new Date(date));

      setUserBooked(currentUserBookedDates);
      setExcludeDates(bookedDates);
    };

    fetchExcludeDates(roomId);
  }, [roomId, bookingCreated]);

  const handleBooking = async () => {
    const accessToken = cookieService.getAccessToken();

    const bookingData = {
      roomId,
      checkInDate: format(checkInDate, "yyyy-MM-dd"),
      checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
    };
    if (!accessToken) {
      alert("Вы должны быть авторизованы,");
      navigate("/login");
      return;
    }

    try {
      if (bookingId) {
        await bookingService.putBookingUpdate(bookingId, bookingData);
        update(bookingData);
      } else {
        await bookingService.postBooking(bookingData);
      }

      if (location.pathname === "/user") {
        setBokingCreated(true);
        alert("Бронирование успешно обновлено");
      } else {
        setBokingCreated(true);
        alert("Номер забронирован");
        navigate("/user");
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
