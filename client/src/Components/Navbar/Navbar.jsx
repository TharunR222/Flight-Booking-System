import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarIcon from "../../assets/calendar-icon.svg";
import { useLocation } from "react-router-dom";

const Navbar = ({ navColor, borColor }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isNotBtnPage =
    location.pathname.includes("/admin/") ||
    location.pathname.includes("/myBooking/");

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLoggedIn(true);
      if (localStorage.getItem("isAdmin") === "true") {
        setIsAdmin(true);
      }
    }
  }, [localStorage.getItem("userId")]);

  const handleClickAdUser = (e) => {
    e.preventDefault();
    if (isAdmin) {
      navigate(`/admin/${localStorage.getItem("userId")}`);
    } else {
      navigate(`/myBooking/${localStorage.getItem("userId")}`);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (loggedIn) {
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("fetchFlData");
    }
    navigate("/auth/login");
  };

  const possibleValues = {
    color1: "bg-orange-500",
    color2: "bg-white",
    color3: "border-orange-500 hover:bg-orange-500 hover:text-white",
    color4: "border-white hover:bg-white hover:text-black",
  };
  return (
    <div
      className={`flex flex-row justify-between h-16 ${possibleValues[navColor]}`}
    >
      <div className="flex flex-row justify-center items-center px-5">
        <img className="h-5" src={CalendarIcon} alt="Calendar-Icon" />
        <p
          className={`flex justify-center items-center mx-4 font-semiboldbold font-snas`}
        >
          See Yup
        </p>
      </div>

      <div className="flex justify-center items-center">
        {!isNotBtnPage && loggedIn && (
          <button
            className={`border-solid border-2 ${possibleValues[borColor]} px-3 py-1 rounded-md`}
            onClick={handleClickAdUser}
          >
            {isAdmin ? "Data Entry" : "My Booking"}
          </button>
        )}
        <button
          className={`mx-10 border-solid border-2 ${possibleValues[borColor]} px-3 py-1 rounded-md`}
          onClick={handleClick}
        >
          {loggedIn ? "Logout" : "Log in"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
