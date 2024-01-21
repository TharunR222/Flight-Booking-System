import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightCard = ({
  fid,
  flname,
  fromLoc,
  toLoc,
  pricing,
  seatAvail,
  date,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobScreen, setIsMobScreen] = useState(window.innerWidth < 1024);
  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  const navigate = useNavigate();
  const handleBook = (e) => {
    e.preventDefault();

    if (localStorage.getItem("userId")) {
      const formData = {
        userId: localStorage.getItem("userId"),
        flightId: fid,
        flname: flname,
        fromLoc: fromLoc,
        toLoc: toLoc,
        pricing: pricing,
        schedOn: date,
        seatAvail: seatAvail,
      };
      navigate("/review", { state: { formData } });
    } else {
      alert("Please login to continue");
      navigate("auth/login");
    }
  };

  return (
    <div className="lg:w-[96%] lg:mx-auto bg-orange-300 rounded-xl flex flex-row justify-between mx-36 my-4 font-sans shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="lg:mx-4 mx-10 my-4">
        <p className="lg:text-2xl text-3xl">{flname}</p>
        <div className="flex flex-col gap-2 pt-2">
          <p>Date: {date}</p>
          <div className="lg:gap-1 lg:flex-wrap flex flex-row gap-2">
            <p>{fromLoc}</p> <p>-------&gt;</p>
            <p>{toLoc}</p>
          </div>
        </div>
      </div>

      <div className="lg:mx-0 mx-5 my-5">
        <p>Pricing: {pricing}</p>
        <p>Availability: {seatAvail}</p>
        <button
          onClick={handleBook}
          className="rounded-lg px-5 py-2 mt-2 mr-5 bg-white hover:bg-orange-500 hover:text-white hover:transition-all"
          disabled={isAdmin}
        >
          Book Flight
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
