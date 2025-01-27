import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/navBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../../store/userSlice";
import cookieService from "../../service/cookie.service";
import logo from "../../img/Wpngwing.com.png";
import { CiLogin, CiLogout } from "react-icons/ci";

const NavBar = () => {
  const [log, setLog] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = cookieService.getRefreshToken();
  const access = cookieService.getAccessToken();

  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/home" ||
    location.pathname === "/login";
  // console.log(isHomePage);

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // console.log(user);
    // console.log(isLoggedIn);

    if (isLoggedIn && !user) {
      dispatch(fetchUser());
    } else if (!access && refresh) {
      dispatch(fetchUser());
    } else if (!access && !refresh) {
      dispatch(logoutUser());
    }
  }, [dispatch, access, refresh, isLoggedIn, user]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        cookieService.removeAuthData();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleScroll = (event, type) => {
    event.preventDefault();

    const sectionId = type === "hotel" ? "targetSection" : "contact";

    if (location.pathname === "/home") {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/home#${sectionId}`;
    }
  };

  return (
    <div
      className={`navbar-main-container ${
        isHomePage ? "navbar-home" : "navbar-not-home"
      }`}
    >
      <div className="navbar-width">
        {!isHomePage ? (
          <h2 className="logo">
            Peak <p>hotel</p>
          </h2>
        ) : (
          <img className="logo-img" src={logo} alt="" />
        )}

        <div className="navbar-main-btn">
          <span className="link-btn">
            <Link to="home">Главная</Link>
          </span>
          <span className="link-btn">
            <a
              href="/home#targetSection"
              onClick={(e) => handleScroll(e, "hotel")}
            >
              Отель
            </a>
          </span>
          <span className="link-btn">
            <Link to="rooms">Забронировать</Link>
          </span>
          <span className="link-btn">
            <a
              href="/home#targetSection"
              onClick={(e) => handleScroll(e, "contact")}
            >
              Контакты
            </a>
          </span>

          <span className="link-btn">
            {access && user?.admin ? <Link to="admin">Админ</Link> : null}
          </span>
        </div>

        <div className="nav-login">
          {access ? (
            <div className="link-btn">
              <Link to="home" onClick={handleLogout}>
                <CiLogout />
              </Link>
            </div>
          ) : (
            <div className="link-btn">
              <Link to="login">
                <CiLogin />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
