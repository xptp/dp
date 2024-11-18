import React from "react";
import axios from "axios";

const CancelBooking = ({ bookingId }) => {
  const handleCancel = async () => {
    try {
      const response = await axios.delete(`/api/cancel/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Booking cancelled!");
    } catch (error) {
      alert("Cancellation failed: " + error.response.data.message);
    }
  };

  return <button onClick={handleCancel}>Cancel Booking</button>;
};

export default CancelBooking;
