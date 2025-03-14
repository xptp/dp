import React from "react";
import MainPage from "./components/page/mainPage";
import "./styles/App.scss";
import NavBar from "./components/ui/navBar";
import { Route, Routes } from "react-router-dom";
import RoomsPage from "./components/page/roomsPage";
import Login from "./components/layouts/login";
import RoomPage from "./components/page/roomPage";
import { ThemeProvider } from "./hooks/ThemeContext";
import AdminPage from "./components/page/adminPage";
import UserPage from "./components/page/userPage";
import PrivateRoute from "./utils/router/privateRoute";
import EdithRoomPage from "./components/page/edithRoomPage/edithRoomPage";
import AddRoomPage from "./components/page/addRomPage";
import UserEdithPage from "./components/page/userEdithPage/userEdithPage";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="home" element={<MainPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="rooms/:_id" element={<RoomPage />} />
          <Route path="login/:type?" element={<Login />} />
          <Route path="userEdith" element={<UserEdithPage />} />
          <Route
            path="rooms/:_id/edith"
            element={
              <PrivateRoute>
                <EdithRoomPage />
              </PrivateRoute>
            }
          />
          <Route
            path="admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="rooms/addRoom"
            element={
              <PrivateRoute>
                <AddRoomPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
