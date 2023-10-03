import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Message from "../components/Message";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className="mt-4 flex justify-around items-center flex-col pt-16">
      {isError && <Message>{message}</Message>}
      <h1 className="text-4xl text-center mb-4 mt-6 font-semibold">
        Welcome to RentVibe
      </h1>
      <form className="max-w-md mx-auto" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button className="primary mt-4">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-black">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
