import React, { useState ,useEffect } from "react";
import { adminBaseURL } from "../axiosInstance";
import { Toaster, toast } from "react-hot-toast";
import {NavLink , useNavigate } from "react-router-dom"

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);

  useEffect(() => {
    if(authUser?.isLogin){
      navigate("/")
    }

  }, [authUser?.isLogin])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignUp = async (e) => {
    console.log(signUpForm);
    e.preventDefault();
    try {
      const { data } = await adminBaseURL.post("/admin/create", signUpForm);
      
      if (data.success) {
        toast.success(data.message || "Account Created!");
       
      navigate("/login")

      }
    } catch (error) {
      console.error("Signup error:", error);
      //toast.error(error.response?.data?.message || "Something went wrong");
      const errorMessage = error?.response?.data

      if(!errorMessage?.success){
        toast.error(errorMessage.message)
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="firstName"
              value={signUpForm.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="lastName"
              value={signUpForm.lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="email"
              value={signUpForm.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
              name="password"
              value={signUpForm.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
