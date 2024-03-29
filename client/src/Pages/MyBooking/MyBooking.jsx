import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import MyBookingCard from "../../Components/MyBookingCard/MyBookingCard";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MyBooking = () => {
  const [fetchData, setFetchData] = useState(null);
  useEffect(() => {
    const formData = { userId: localStorage.getItem("userId") };
    const func = async () => {
      let response = await fetch(BACKEND_URL + "/fetchBookData/fetchData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      let res = await response.json();
      console.log(res);
      return res;
    };
    func().then((res) => {
      console.log(res);
      setFetchData(res.found);
    });
  }, []);

  return (
    <>
      <Navbar navColor="color1" borColor="color4" />
      <p className="p-5 text-4xl font-bold">My Booking</p>
      <div className="flex flex-row flex-wrap justify-start">
        {fetchData &&
          fetchData.map((data) => (
            <MyBookingCard
              flname={data.flBook.flname}
              fromLoc={data.flBook.fromLoc}
              toLoc={data.flBook.toLoc}
              pricing={data.flBook.pricing}
              noOfSeats={data.noOfSeats}
              date={data.bookedDate.split("T")[0]}
            />
          ))}
      </div>
    </>
  );
};

export default MyBooking;
