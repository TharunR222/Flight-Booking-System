import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Admin from "./Pages/Admin/Admin";
import MyBooking from "./Pages/MyBooking/MyBooking";
import Review from "./Pages/Review/Review";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/admin/:id" element={<Admin />} />
      <Route path="/myBooking/:id" element={<MyBooking />} />
      <Route path="/review" element={<Review />} />
    </Routes>
  );
}
