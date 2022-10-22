import { useState } from "react";
import { useNavigate } from "react-router-dom";
//styles
import "./SearchBar.css";
import searchIcon from "../assets/search-icon.svg";

import React from "react";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?q=${term}`);
    setTerm("");
  };

  return (
    <div className="searchbar">
      <form onSubmit={submitHandler}>
        <input
          value={term}
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search..."
        />
        <img src={searchIcon} alt="search icon" />
      </form>
    </div>
  );
}
