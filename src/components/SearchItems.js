import React from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../utils/citySlice";

const SearchItems = ({ item }) => {
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(addCity(item));
  };
  return (
    <div className="px-1 hover:bg-green-200 hover:rounded-md w-48">
      <button onClick={() => handleClick(item)} id={item.id}>
        {item.name},{" " + item.country}
      </button>
    </div>
  );
};

export default SearchItems;
