import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navBar.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import cookieService from "../../service/cookie.service";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access = cookieService.getAccessToken();

  const handleLogout = () => {
    dispatch(logoutUser());
    cookieService.removeAuthData();
    navigate("/");
  };

  return (
    <div className="main-nav">
      <div className="nav-info">
        <div className="h-name">SNOW PEAK HOTEL</div>
        <div className="address">
          Красная Поляна, Краснодарский край, 354392
        </div>
      </div>
      <div className="nav-bar">
        <div className="n-div">
          <Link className="n-link" to="home">
            ГЛАВНАЯ
          </Link>
        </div>
        <div className="n-div">
          <Link className="n-link" to="rooms">
            НОМЕРА
          </Link>
        </div>
        <div className="n-div">
          <Link className="n-link" to="booking">
            ТЕст
          </Link>
        </div>
        {access ? (
          <div className="n-div">
            <Link className="n-link" to="admin">
              Админ
            </Link>
          </div>
        ) : null}
        {access ? (
          <div className="n-div">
            <Link className="n-link" to="home" onClick={handleLogout}>
              ВЫХОД
            </Link>
          </div>
        ) : (
          <div className="n-div">
            <Link className="n-link" to="login">
              ЛИЧНЫЙ КАБИНЕТ
            </Link>
          </div>
        )}

        {/* <div className="n-div">
          <Link className="n-link" to="/">
            Админ
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
