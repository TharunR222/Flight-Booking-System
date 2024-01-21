import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      console.log(formData);
      const func = async () => {
        let response = await fetch(
          "https://flight-booking-system-4i79.onrender.com/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        let res = await response.json();
        console.log(res);
        return res;
      };
      func()
        .then((res) => {
          if (res.userData) {
            console.log(res.userData);
            localStorage.setItem("userId", res.userData.access_token);
            localStorage.setItem("isAdmin", res.userData.isAdmin);
            navigate("/");
          } else {
            alert(res.mssg);
          }
        })
        .then((res) => {
          for (const key in formData) {
            setFormData((prevFormData) => ({ ...prevFormData, [key]: "" }));
          }
        });
    }
  };

  return (
    <div className="min-h-lvh flex flex-col justify-center items-center">
      <form
        className="lg:bg-orange-200 lg:w-[96%] lg:px-4 lg:py-6 p-10 rounded-md flex flex-col shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
        onSubmit={handleSubmit}
      >
        <label className="py-3" htmlFor="username">
          Username
        </label>
        <input
          className="p-2 mb-2 border-solid border-2 lg:rounded-md"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label className="py-3" htmlFor="password">
          Password
        </label>
        <input
          className="p-2 mb-10 border-solid border-2 lg:rounded-md"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="bg-cyan-500 rounded-md px-40 py-2 hover:bg-cyan-400"
          type="submit"
          value="Login"
        />
      </form>
      <p className="flex items-center justify-center mt-5">
        Don't have an account?{" "}
        <Link to={`/auth/signup`} className="text-sky-500 px-3">
          Signup here!
        </Link>
      </p>
    </div>
  );
};

export default Login;
