import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from "../features/auth/authSlice";

const Header = ({handleSearch}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  // Search Functionality
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchInput = e => {
    setSearchQuery(e.target.value)
    handleSearch(e.target.value)
  }
  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

  const headerContent = isActiveRoute('/') ? 'px-32' : 'px-64'; 
  const inputDisabled = isActiveRoute('/') ? false : true; 

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <header className={`${headerContent} flex items-center justify-between shadow-md shadow-gray-300`}>
      <Link to={"/"} className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-violet-700"
        >
          <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
          <path
            fillRule="evenodd"
            d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
            clipRule="evenodd"
          />
        </svg>

        <span className="font-bold text-xl pt-1 text-violet-700">RentVibe</span>
      </Link>
      <div className="flex relative w-100 ">
        <input
          type="text"
          className="shadow-md shadow-gray-300 searchInput"
          value={searchQuery}
          onChange={handleSearchInput}
          placeholder="Search for dream house..."
          disabled={inputDisabled}
        />
        <button className="bg-violet-700 text-white p-2 rounded-full absolute right-2 top-3.5 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <button
        className="rounded-full relative"
        onClick={toggleDropdown}
      >
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {dropdown && (
          <div className="absolute bg-white shadow-md shadow-gray-300 border w-64 py-2 top-10 right-1 rounded dropdownBox" ref={dropdownRef}>
            <ul>
              {user ? (
                <>
                  <li className="text-start font-semibold hover:bg-gray-200 py-1">
                    <Link to={"/account"} className="ml-3 pr-20">
                      Profile
                    </Link>
                  </li>
                  <li className="bg-gray-600 my-2 lineBar hover:bg-blue-700"></li>
                  <li className="text-start font-semibold hover:bg-gray-200 py-1" onClick={onLogout}>
                    <a className="ml-3  pr-20 bg-transparent">Logut</a>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-start font-semibold hover:bg-gray-200 py-1">
                    <Link to={"/login"} className="ml-3  pr-20 bg-transparent">
                      Login
                    </Link>
                  </li>
                  <li className="text-start font-semibold hover:bg-gray-200 py-1">
                    <Link to={"/register"} className="ml-3  pr-20 bg-transparent">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </button>
    </header>
  );
};

export default Header;
