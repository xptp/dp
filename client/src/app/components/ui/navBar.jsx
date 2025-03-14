import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/navBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../../store/reducers/userSlice";
import cookieService from "../../service/cookie.service";
import logo from "../../img/Wpngwing.com.png";
import { CiLogin, CiLogout } from "react-icons/ci";
import { IoIosSunny } from "react-icons/io";
import { GrUserManager } from "react-icons/gr";
import { FaMoon } from "react-icons/fa";
import useDarkMode from "../../hooks/useDarkMode";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = cookieService.getRefreshToken();
  const access = cookieService.getAccessToken();

  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/home" ||
    location.pathname === "/login";

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
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
        console.error(error);
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
          <h2 className={`logo ${!isScrolled ? "scrolled-logo" : ""}`}>
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
            <Link to="rooms">Забронировать</Link>
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
            <a
              href="/home#targetSection"
              onClick={(e) => handleScroll(e, "contact")}
            >
              Контакты
            </a>
          </span>

          <span className="link-btn">
            {access && user?.admin ? (
              <Link to="admin">Админ</Link>
            ) : access && user ? (
              <Link to="user">Бронь</Link>
            ) : null}
          </span>
        </div>
        <button
          className={`mode-btn ${theme === "light" ? `light` : `dark`}`}
          onClick={toggleTheme}
        >
          {theme === "light" ? <IoIosSunny /> : <FaMoon />}
        </button>
        {user ? (
          <Link to="userEdith" className="mode-btn light">
            <GrUserManager />
          </Link>
        ) : null}

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
