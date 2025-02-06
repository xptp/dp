import React, { useEffect, useState } from "react";
import bookingService from "../../service/booking.service";
import Loader from "./loader";
import "../../styles/ui/bookingList.scss";

const BookingList = ({ roomId, onClose }) => {
  const [bookings, setBookings] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [roomId]);

  async function fetchBooking() {
    try {
      setLoad(true);
      const data = await bookingService.getBooked(roomId);
      setBookings(data);
      console.log(data);

      setLoad(false);
    } catch (error) {
      console.error(error);
      setLoad(false);
    }
  }

  async function deleteBooking(bookingId) {
    if (!bookingId) {
      return;
    }

    try {
      await bookingService.cancelBooking(bookingId);
      fetchBooking();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {load ? (
          <Loader />
        ) : (
          <ul>
            {bookings.length === 0 ? (
              <span>Бронирования отсутствуют</span>
            ) : (
              bookings.map((booking, index) => (
                <li key={index} className="li-modal">
                  <div className="li-div">
                    <div>
                      <strong>Заезд:</strong>{" "}
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Выезд:</strong>{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="close-button"
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookingList;
