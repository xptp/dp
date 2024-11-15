import React from "react";
import MainPage from "./components/page/mainPage";
import "./styles/App.scss";
import NavBar from "./components/ui/navBar";
import { Route, Routes } from "react-router-dom";
import RoomsPage from "./components/page/roomsPage";
import Login from "./components/layouts/login";
import RoomPage from "./components/page/roomPage";
// import Footer from "./components/ui/footer";
import AdminPage from "./components/page/adminPage";
import TestBookingPage from "./components/page/text";
function App() {
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="home" element={<MainPage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="booking" element={<TestBookingPage />} />
        <Route path="rooms/:_id" element={<RoomPage />} />
        <Route path="login/:type?" element={<Login />} />
        <Route path="admin" element={<AdminPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
