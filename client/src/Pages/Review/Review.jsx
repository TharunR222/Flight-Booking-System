import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Review = () => {
  const [seatData, setSeatData] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const props = { ...location.state.formData };
  const [pricingData, setPricingData] = useState(props.pricing);

  const handleSubmit = (e) => {
    e.preventDefault();
    const func = async () => {
      const sendData = {
        userId: props.userId,
        flightId: props.flightId,
        date: new Date(props.schedOn).toISOString(),
        noOfSeats: seatData,
      };
      console.log(sendData);
      let response = await fetch(BACKEND_URL + "/flights/bookFlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      let res = await response.json();
      console.log(res);
      return res;
    };
    func().then((res) => {
      if (res) {
        alert("Booking Successful");
        navigate("/");
      }
    });
  };

  return (
    <>
      <Navbar navColor="color1" borColor="color4" />
      <div className="lg:w-[96%] lg:m-auto mx-5">
        <p className="lg:text-2xl lg:pb-1 text-4xl pt-5 pb-5 flex justify-center">
          Kindly check out the flight details!!!
        </p>

        <div className="lg:w-full lg:bg-orange-200 lg:p-2 pt-4 pb-8 px-10 w-2/3 m-auto flex flex-col font-light shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg">
          <p className="pt-5">Name of the provider</p>
          <p
            className="py-3 border-2 px-2 lg:rounded-md lg:bg-gray-200 lg:py-2"
            disabled
          >
            {props.flname}
          </p>
          <div className="flex flex-row items-center gap-10 pt-5 lg:flex-col lg:gap-3 lg:pt-3">
            <div className="flex flex-row gap-5 items-center w-1/2 lg:gap-0 lg:flex-col lg:w-full lg:items-start">
              <p>Departure</p>
              <p
                className="py-3 border-2 w-full px-2 lg:rounded-md lg:bg-gray-200 lg:py-2"
                disabled
              >
                {props.fromLoc}
              </p>
            </div>
            <div className="flex flex-row gap-5 items-center w-1/2 lg:gap-0 lg:flex-col lg:w-full lg:items-start">
              <p>Arrival</p>
              <p className="py-3 border-2 w-full px-2 lg:rounded-md lg:bg-gray-200 lg:py-2">
                {props.toLoc}
              </p>
            </div>
          </div>
          <p className="pt-4">Scheduled On</p>
          <p
            className="py-3 border-2 w-full px-2 lg:rounded-md lg:bg-gray-200 lg:py-2"
            disabled
          >
            {props.schedOn}
          </p>

          <p className="pt-4">Pricing</p>
          <p
            className="py-3 border-2 px-2 lg:rounded-md lg:bg-gray-200 lg:py-2"
            disabled
          >
            {pricingData}
          </p>
          <p className="pt-4">Choose number of seats</p>
          <div className="flex flex-row items-center pt-2 pb-4 lg:pb-6">
            <button
              className="px-4 rounded-md font-bold text-lg hover:bg-slate-300 lg:rounded-md lg:bg-gray-200 lg:hover:bg-orange-400"
              onClick={(e) => {
                e.preventDefault();
                if (seatData > 1) {
                  setSeatData((prevData) => (prevData -= 1));
                  setPricingData((seatData - 1) * props.pricing);
                }
              }}
            >
              -
            </button>
            <p className="w-10 h-7 items-center flex justify-center lg:rounded-md lg:bg-gray-200">
              {seatData}
            </p>
            <button
              className="px-3 rounded-md font-bold text-lg hover:bg-slate-300 lg:rounded-md lg:bg-gray-200 lg:hover:bg-orange-400"
              onClick={(e) => {
                e.preventDefault();
                if (seatData < parseInt(props.seatAvail)) {
                  console.log("IN");
                  console.log(seatData);
                  setSeatData((prevData) => (prevData += 1));
                  setPricingData((seatData + 1) * props.pricing);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-8 lg:mx-3 lg:pb-2 lg:pt-2">
          <button
            className="w-fit px-12 py-3 -mt-5 rounded-lg bg-orange-500 text-white hover:bg-orange-400 hover:text-black hover:scale-105 hover:transition-all"
            onClick={handleSubmit}
          >
            Confirm
          </button>
          <button
            className="w-fit px-12 py-3 -mt-5 rounded-lg bg-orange-500 text-white hover:bg-orange-400 hover:text-black hover:scale-105 hover:transition-all"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Review;
