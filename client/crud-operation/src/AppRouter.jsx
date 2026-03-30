import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"                          
        element={
          <ProtectedRoute>           
            <App />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
