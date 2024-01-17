import React from "react";

const MyBookingCard = ({flname, fromLoc, toLoc, pricing, noOfSeats, date}) => {
  return (
    <div className="bg-orange-300 rounded-xl flex flex-row justify-between w-[25%] mx-5 my-4 font-sans shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="mx-10 my-4 flex flex-col gap-3">
        <p className="text-3xl">{flname}</p>
        <div className="flex flex-col gap-2 pt-2">
          <p>Scheduled On: {date}</p>
          <div className="flex flex-row gap-2">
            <p>{fromLoc}</p> <p>-------&gt;</p> <p>{toLoc}</p>
          </div>
        </div>
        <div className="flex flex-row gap-10 items-center justify-center">
          <p>Pricing: {pricing}</p>
          <p>Number of seats: {noOfSeats}</p>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
