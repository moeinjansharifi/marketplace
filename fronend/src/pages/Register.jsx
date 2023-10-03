import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from "../features/auth/authSlice";
import Message from "../components/Message";

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [checkPass, setCheckPass] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isSuccess, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
     setCheckPass('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around flex-col pt-16">
        {checkPass && <Message>{checkPass}</Message>}
        {isError && <Message>{message}</Message>}
      <div className="">
        <h1 className="text-4xl text-center mb-4">Welcome to RentVibe</h1>
        <form className="max-w-md mx-auto" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}
          />
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
           <input
            type="password"
            placeholder="confirm password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
          <button className="primary mt-4">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
