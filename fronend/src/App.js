import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios, { all } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPlaces, reset } from "./features/place/placeSlice";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import Account from "./pages/Account";
import AddNewPlace from "./pages/AddNewPlace";
import EditPlace from "./pages/EditPlace";

axios.defaults.baseURL = "http://localhost:5000/api/v1";

const App = () => {
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const [getSearchResult, setGetSearchResult] = useState(false);

  const { places, isError, message } = useSelector((state) => state.place);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getPlaces());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const allPlaces = places.places;

  const handleSearch = (query) => {
    setGetSearchResult(true);
    const filtered = allPlaces.filter(
      (item) =>
        item.title.toLowerCase().trim().includes(query.toLowerCase().trim()) ||
        item.address
          .toLowerCase()
          .trim()
          .includes(query.toLowerCase().trim()) ||
        item.price.toFixed().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <Router>
      <Header handleSearch={handleSearch} />
      <main className="px-32">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            index
            path="/"
            element={
              <Home
                filteredData={filteredData}
                getSearchResult={getSearchResult}
              />
            }
          />
          <Route path="/places/:id" element={<PlaceDetails />} />
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/addnewplace" element={<AddNewPlace />} />
          <Route path="/places/editPlace/:id" element={<EditPlace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
