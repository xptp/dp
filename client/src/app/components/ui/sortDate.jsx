// import React, { useState } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";
// import cookieService from "../../service/cookie.service";

// const RoomAvailabilityChecker = ({ onFilter }) => {
//   const [checkInDate, setCheckInDate] = useState(new Date());
//   const [checkOutDate, setCheckOutDate] = useState(new Date());

//   const handleSearch = async () => {
//     try {
//       const accessToken = cookieService.getAccessToken();
//       const response = await axios.get(
//         `http://localhost:8080/api/book/available-rooms`,
//         {
//           params: {
//             checkInDate: format(checkInDate, "yyyy-MM-dd"),
//             checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
//           },
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       onFilter(response.data);
//     } catch (error) {
//       console.error("Error fetching available rooms:", error);
//       alert(
//         "Error fetching available rooms: " + error.response?.data?.message ||
//           error.message
//       );
//     }
//   };

//   return (
//     <div>
//       <h2>Check Room Availability</h2>
//       <div>
//         <label>Check-In Date:</label>
//         <DatePicker
//           selected={checkInDate}
//           onChange={(date) => setCheckInDate(date)}
//           dateFormat="yyyy-MM-dd"
//         />
//       </div>
//       <div>
//         <label>Check-Out Date:</label>
//         <DatePicker
//           selected={checkOutDate}
//           onChange={(date) => setCheckOutDate(date)}
//           dateFormat="yyyy-MM-dd"
//         />
//       </div>
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default RoomAvailabilityChecker;
