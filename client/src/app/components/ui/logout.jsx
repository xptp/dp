import React from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/actions";
import Cookies from "js-cookie";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    Cookies.remove("user");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
