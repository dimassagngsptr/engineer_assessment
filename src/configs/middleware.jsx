import { Navigate, Outlet } from "react-router-dom";

const Middleware = () => {
  const token = localStorage.getItem("token");
  return <>{!token ? <Navigate to={"/login"} replace /> : <Outlet></Outlet>}</>;
};
export default Middleware;
