import City from "./City";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { useState, useEffect } from "react";
import { addCity } from "../utils/citySlice";

const Body = () => {
  const buttonStatus = useSelector((store) => store.addButton.buttonStatus);
  const cityList = useSelector((store) => store.cityDetail.city);
  const dispatch = useDispatch();
  // const [fah, setFah] = useState(false);
  // const [miles, setMiles] = useState(false);
  // const handleFah = () => {
  //   setFah(!fah);
  // };
  // const handleMile = () => {
  //   setMiles(!miles);
  // };
  useEffect(() => {
    const data = window.localStorage.getItem("Stored city");
    if (data !== null) {
      JSON.parse(data).map((item) => {
        dispatch(addCity(item));
      });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Stored city", JSON.stringify(cityList));
  }, [cityList]);

  return (
    <div className="flex justify-evenly mt-20">
      <div className="flex-col">
        {cityList.map((city) => {
          return (
            <City
              latitude={city.latitude}
              longitude={city.longitude}
              name={city.name}
              key={city.id}
              id={city.id}
            />
          );
        })}
      </div>
      <div className="flex">
        {buttonStatus && <Search />}
        {/* {buttonStatus && (
          <div className="flex">
            <div className="mr-5">
              <input type="checkbox" className="mr-1" onClick={handleFah} />
              <label className="font-semibold">Fahrenheit</label>
            </div>
            <div>
              <input type="checkbox" className="mr-1" onClick={handleMile} />
              <label className="font-semibold">mp/h</label>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Body;
