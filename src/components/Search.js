import React from "react";
import { useState, useEffect } from "react";
import { search_URL_initial, search_URL_last } from "../utils/API";
import { useDispatch } from "react-redux";
import SearchItems from "./SearchItems";

const Search = () => {
  //Store state of some conditions
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const dispatch = useDispatch;

  //Call the fetch method
  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchSuggestions();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  //Fetch API method
  const getSearchSuggestions = async () => {
    const data = await fetch(
      search_URL_initial + searchQuery + search_URL_last
    );
    const json = await data.json();
    setSuggestion(json.results);
  };

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="City?"
        className="rounded-t-md pl-3 mr-2 border border-green-300 w-52"
      />
      {showSuggestion && suggestion !== undefined && (
        <div className="max-h-52 w-52 overflow-scroll overflow-x-hidden">
          {suggestion.map((item, index) => {
            return <SearchItems item={item} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
