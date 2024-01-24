import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import DatePicker from "react-multi-date-picker";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
  const [dValue, setDValue] = useState([]);

  const [formData, setFormData] = useState({
    flName: "",
    fromLoc: "",
    toLoc: "",
    pricing: "",
    seatAvail: "",
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
    console.log(formData);
    for (const key in formData) {
      if (`${formData[key]}`.trim() == "") {
        value = false;
        console.log(key);
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
      const formDataMod = { ...formData };
      const cur = dValue.map((val) => {
        var dt = new Date(val);
        dt = dt.toISOString();
        return dt;
      });
      formDataMod.dates = cur;
      const sendData = {
        id: localStorage.getItem("userId"),
        postData: formDataMod,
      };
      console.log(sendData);
      const func = async () => {
        let response = await fetch(BACKEND_URL + "/flData/postFlights", {
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
      func()
        .then((res) => {
          alert(res.mssg);
        })
        .then((res) => {
          for (const key in formData) {
            setDValue([]);
            setFormData((prevFormData) => ({ ...prevFormData, [key]: "" }));
          }
        });
    }
  };

  return (
    <>
      <Navbar navColor="color1" borColor="color4" />
      <div className="lg:mx-1 mx-5">
        <p className="lg:text-2xl text-5xl pt-4 font-bold">Hey Admin!</p>
        <p className="lg:text-xl text-4xl pt-2 pb-1">Welcome Back</p>

        <form className="lg:bg-orange-200 lg:w-full lg:px-2 lg:pt-4 pb-8 px-10 w-2/3 m-auto flex flex-col font-light shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg">
          <label className="pt-5 lg:pt-1" htmlFor="flName">
            Name of the provider
          </label>
          <input
            className="py-3 border-2  lg:rounded-md"
            type="text"
            id="flName"
            name="flName"
            value={formData.flName}
            onChange={handleChange}
          />
          <div className="flex flex-row items-center gap-10 pt-5 lg:flex-col lg:gap-1 lg:pt-3">
            <div className="flex flex-row gap-5 items-center w-1/2 lg:gap-0 lg:flex-col lg:w-full lg:items-start">
              <label htmlFor="dept">Departure</label>
              <input
                className="py-3 border-2 w-full lg:rounded-md"
                type="text"
                id="dept"
                name="fromLoc"
                value={formData.fromLoc}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row gap-5 items-center w-1/2 lg:gap-0 lg:flex-col lg:w-full lg:items-start">
              <label htmlFor="arr">Arrival</label>
              <input
                className="py-3 border-2 w-full  lg:rounded-md"
                type="text"
                id="arr"
                name="toLoc"
                value={formData.toLoc}
                onChange={handleChange}
              />
            </div>
          </div>
          <p className="pt-2">Pick the flight availability dates</p>
          <DatePicker
            inputClass="py-3 border-2 w-full  lg:rounded-md"
            value={dValue}
            onChange={setDValue}
            multiple
            minDate={new Date()}
          />
          <label className="pt-2" htmlFor="price">
            Pricing
          </label>
          <input
            className="py-3 border-2  lg:rounded-md"
            type="text"
            id="price"
            name="pricing"
            value={formData.pricing}
            onChange={handleChange}
          />
          <label className="pt-2" htmlFor="availS">
            Seat Availability
          </label>
          <input
            className="py-3 border-2  lg:rounded-md"
            type="text"
            id="availS"
            name="seatAvail"
            value={formData.seatAvail}
            onChange={handleChange}
          />
        </form>
        <button
          className="lg:mb-10 flex flex-row items-center w-fit px-12 py-3 -mt-5 rounded-lg  m-auto bg-orange-500 text-white hover:bg-orange-400 hover:text-black hover:scale-105 hover:transition-all"
          value="Add Flight Data"
          onClick={handleSubmit}
        >
          Add Flight Data
        </button>
      </div>
    </>
  );
};

export default Admin;
