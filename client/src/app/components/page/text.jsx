import React from "react";
import BookingForm from "../ui/booingForm";
import BookingList from "../ui/bookengDelForm";
import "../../styles/ui/testBooking.scss";
const TestBookingPage = () => {
  return (
    <div className="a">
      <h1>Hotel Booking System</h1>
      <BookingForm roomId="2" />
      <BookingList />
    </div>
  );
};

export default TestBookingPage;
