import React, { useState } from "react";

const TravelCard = ({ onChange }) => {
  const [isClicked, setIsClicked] = useState("Find flights on the go.. Yup!!");
  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    lookOn: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var value = true;
    for (const key in formData) {
      if (`${formData[key]}`.trim() == "") {
        value = false;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [key]: "",
        }));
      }
    }
    if (value == false) {
      alert("Please fill out the blank fields");
    }
    if (value) {
      setIsClicked("Fetching available flights for you!!!");
      console.log(formData);
      const func = async () => {
        let response = await fetch(
          "https://flight-booking-system-4i79.onrender.com/flights/fetchFlights",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        let res = await response.json();
        return res;
      };
      func()
        .then((res) => {
          localStorage.setItem("fetchFlData", JSON.stringify(res));
          setIsClicked("");
          onChange(res);
        })
        .then((res) => {
          for (const key in formData) {
            setFormData((prevFormData) => ({ ...prevFormData, [key]: "" }));
          }
        });
    }
  };

  return (
    <>
      <div className="bg-orange-500 h-44 flex flex-col"></div>
      <div className="-mt-40">
        <form className="lg:w-[96%] lg:flex-col lg:pt-4 lg:mt-4 pb-10 bg-white w-2/3 m-auto rounded-lg flex flex-row justify-around pt-8 mt-16 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <div className="flex flex-col">
            <label
              htmlFor="fromLocation"
              className="lg:mx-10 w-fit -mb-3 z-10 mx-2 text-lg bg-white"
            >
              From
            </label>
            <input
              className="lg:w-80 lg:p-4 lg:mx-auto p-5 rounded-md bg-inherit border-solid border-2 border-gray-400"
              type="text"
              name="fromLocation"
              id="fromLocation"
              placeholder="Enter the city"
              value={formData.fromLocation}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="toLocation"
              className="lg:mx-10 w-fit -mb-3 z-10 mx-2 text-lg bg-white"
            >
              To
            </label>
            <input
              className="lg:w-80 lg:p-4 lg:mx-auto p-5 rounded-md bg-inherit border-solid border-2 border-gray-400"
              type="text"
              name="toLocation"
              id="toLocation"
              placeholder="Enter the city"
              value={formData.toLocation}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lookOn"
              className="lg:mx-10 w-fit -mb-3 z-10 mx-2 text-lg bg-white"
            >
              Departure
            </label>
            <input
              className="lg:w-80 lg:p-4 lg:mx-auto p-5 rounded-md bg-inherit border-solid border-2 border-gray-400"
              type="date"
              name="lookOn"
              id="lookOn"
              placeholder="Departure"
              value={formData.lookOn}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </form>
        <button
          onClick={handleSubmit}
          className="w-fit flex -mt-4 px-12 py-3 rounded-lg m-auto bg-orange-500 text-white hover:bg-orange-400 hover:text-black hover:scale-105 hover:transition-all"
        >
          Find Flights
        </button>
        <div className="flex justify-center items-center text-2xl">
          {isClicked}
        </div>
      </div>
    </>
  );
};

export default TravelCard;
