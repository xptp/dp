// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Loader from "../../ui/loader";
// import SwiperComponent from "../../ui/swiperComponent";
// import "../../../styles/pages/roomPage.scss";
// import roomService from "../../../../service/roomService.service";

// const RoomPage = () => {
//   const [room, setRoom] = useState();
//   const [load, setLoad] = useState(false);
//   const params = useParams();
//   console.log(params, "params");

//   const { id } = params;

//   useEffect(() => {
//     fetchRoom();
//   }, []);

//   async function fetchRoom() {
//     setLoad(true);

//     try {
//       const r = await roomService.getById(id);
//       setRoom(r);
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setLoad(false);
//     }
//   }

//   return (
//     <>
//       {room ? (
//         <div className="roomPage">
//           <SwiperComponent
//             objImages={room.images}
//             clName={"main-swiper-room"}
//           />

//           <div className="room-content">
//             <h1>{room.name}</h1>
//             <div className="places">
//               Количество спальных мест: {room.places}
//             </div>
//             <div className="desc">{room.description}</div>
//           </div>
//           <button className="btn">ЗАБРОНИРОВАТЬ</button>
//         </div>
//       ) : load ? (
//         <Loader />
//       ) : null}
//     </>
//   );
// };

// export default RoomPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../ui/loader";
import SwiperComponent from "../../ui/swiperComponent";
import "../../../styles/pages/roomPage.scss";
import roomService from "../../../service/roomService.service";
import BookingForm from "../../ui/booingForm";

const RoomPage = () => {
  const [room, setRoom] = useState(null);
  const { _id } = useParams();
  // console.log(_id);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      setIsLoading(true);
      try {
        const fetchedRoom = await roomService.getById(_id);
        setRoom(fetchedRoom);
      } catch (error) {
        console.error("Ошибка при получении комнаты:", error);
      }
      setIsLoading(false);
    };

    fetchRoom();
  }, [_id]);

  if (isLoading) {
    return <Loader />;
  }

  return room ? (
    <div className="roomPage">
      <SwiperComponent objImages={room.images} clName={"main-swiper-room"} />
      <BookingForm roomId={_id} />
      <div className="room-content">
        <h1>{room.name}</h1>
        <div className="places">Количество спальных мест: {room.places}</div>
        <p className="desc">{room.description}</p>
      </div>

      <button className="btn">ЗАБРОНИРОВАТЬ</button>
    </div>
  ) : null;
};

export default RoomPage;
