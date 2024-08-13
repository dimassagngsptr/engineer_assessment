import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/base/input";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toastify } from "../../components/base/toastify";
import Spinner from "../../components/base/spinner";
import { register } from "../../configs/redux/features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e?.target?.name]: e?.target?.value });
  };
  const onRegister = async () => {
    const res = await dispatch(register(data));
    if (res?.password?.status != "success") {
      toastify("error", res?.payload?.data?.message);
    }
    toastify("success", res?.payload?.status);
    navigate("/login");
  };
  return (
    <main className="w-screen h-screen bg-gray-50">
      <div className="flex flex-col justify-center items-center h-screen gap-y-4">
        <div className="bg-white p-8 rounded-md">
          <div className="flex gap-x-3 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            <h1 className="text-xl font-semibold">Register Account</h1>
          </div>
          <div className="flex flex-col gap-y-3">
            <Input
              label={"Name"}
              className="border border-gray-500 p-2 w-[300px] rounded-md outline-none"
              placeholder="Input name"
              name="name"
              value={data?.name}
              onChange={(e) => handleChange(e)}
            />
            <Input
              label={"Email"}
              className="border border-gray-500 p-2 w-[300px] rounded-md  outline-none"
              placeholder="Input email"
              name="email"
              value={data?.email}
              onChange={(e) => handleChange(e)}
            />
            <Input
              label={"Password"}
              className="border border-gray-500 p-2 w-[300px] rounded-md outline-none"
              placeholder="Input password"
              name="password"
              type="password"
              value={data?.password}
              onChange={(e) => handleChange(e)}
            />
            <button
              onClick={onRegister}
              className="w-full border border-blue-500 text-blue-500 p-2 mt-5 rounded-full hover:bg-blue-500 hover:text-white"
            >
              {loading ? <Spinner /> : "Register"}
            </button>
            <div className="flex gap-1 mt-2 items-center">
              <small>Already have an account?</small>
              <Link
                to={"/login"}
                className="text-blue-500 hover:underline text-sm"
              >
                login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
