import { DateRange } from "react-date-range";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Middleware from "./configs/middleware";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { getProfile } from "./configs/redux/features/userSlice";

const router = createBrowserRouter([
  { element: <Middleware />, children: [{ path: "/", element: <Home /> }] },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      dispatch(getProfile());
    }
    getUser();
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
