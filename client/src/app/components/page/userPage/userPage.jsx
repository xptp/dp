import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import bookingService from "../../../service/booking.service";
import "../../../styles/pages/userPage.scss";
import Loader from "../../ui/loader";
import BookingForm from "../../forms/bookingForm";

const UserPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getBookings = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      const data = await bookingService.fetchUserBookings(user._id);
      setBookings(data);
    };

    if (user?._id) {
      getBookings();
    }
  }, [user?._id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCancelBooking = async (bookingId) => {
    await bookingService.cancelBooking(bookingId);
    setBookings(bookings.filter((booking) => booking._id !== bookingId));
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
  };

  const updateBooking = (updatedBooking) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === editingBooking._id
          ? { ...booking, ...updatedBooking }
          : booking
      )
    );
    setEditingBooking(null);
  };

  return (
    <>
      {!loading ? (
        <div className="main-user-page">
          {user ? (
            <div className="user-page-container">
              {/* <h1>{user.email}</h1> */}
              <h1>Забронированные номера:</h1>
              <ul>
                {bookings.map((booking) => (
                  <div className="booking-container" key={booking._id}>
                    <p>Номер: {booking.room.number}</p>
                    <p>
                      Дата въезда:
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                    <p>
                      Дата выезда:
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleEditBooking(booking)}
                      className="edit-btn user-btn"
                    >
                      Редактировать бронь
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="del-btn user-btn"
                    >
                      Удалить бронь
                    </button>
                  </div>
                ))}
              </ul>
              {editingBooking && (
                <div className="user-modal">
                  <div className="user-modal-content">
                    <BookingForm
                      roomId={editingBooking.room._id}
                      initialCheckInDate={new Date(editingBooking.checkInDate)}
                      initialCheckOutDate={
                        new Date(editingBooking.checkOutDate)
                      }
                      bookingId={editingBooking._id}
                      bookClassName="edit-booking-form"
                      update={updateBooking}
                    />

                    <button onClick={handleCancelEdit} className="modal-btn">
                      Отмена
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserPage;
