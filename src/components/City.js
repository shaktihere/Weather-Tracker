import React, { useEffect, useState } from "react";
import {
  city_URL_initial,
  city_URL_last,
  fah_URL,
  miles_URL,
  seven_URL_final,
  seven_URL_initial,
} from "../utils/API";
import { useDispatch } from "react-redux";
import { removeCity } from "../utils/citySlice";

const City = ({ latitude, longitude, name, id }) => {
  const [city, setCity] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [detailed, setDetailed] = useState({});
  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(removeCity(id));
  };
  const detailing = () => {
    setShowDetail(!showDetail);
  };
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      city_URL_initial + latitude + "&longitude=" + longitude + city_URL_last
    );
    const data_seven = await fetch(
      seven_URL_initial + latitude + "&longitude=" + longitude + seven_URL_final
    );
    const json = await data.json();
    const json_seven = await data_seven.json();
    setCity(json);
    setDetailed(json_seven);
  };
  if (city.current) {
    return (
      <div>
        <div
          onClick={detailing}
          onMouseOver={() => setCancel(true)}
          onMouseLeave={() => setCancel(false)}
          className="flex relative mb-2 shadow-md py-2 rounded-lg items-center cursor-pointer hover:bg-blue-300 shadow-blue-400 hover:shadow-blue-600"
        >
          <h1 className="w-40 ml-1 font-bold">{name}</h1>
          <ul className="text-left ml-5 w-48">
            <li className="border-b border-blue-300">
              <span className="font-semibold">Temperature:</span>{" "}
              {city.current.temperature_2m +
                " " +
                city.current_units.temperature_2m}
            </li>
            <li className="border-t border-b border-blue-300">
              <span className="font-semibold">Wind Speed:</span>{" "}
              {city.current.wind_speed_10m +
                " " +
                city.current_units.wind_speed_10m}
            </li>
            <li className="border-t border-blue-300">
              <span className="font-semibold">Precipitation:</span>{" "}
              {city.current.precipitation +
                " " +
                city.current_units.precipitation}
            </li>
          </ul>
          {cancel && (
            <button
              className="absolute top-1 right-2 bg-red-600 text-white px-2 rounded-full"
              onClick={deleteItem}
            >
              X
            </button>
          )}
        </div>
        <div>
          {showDetail && (
            <table className="mb-10 border table-auto border-white rounded-xl shadow-md shadow-orange-300 hover:bg-blue-100 hover:shadow-red-300">
              <tr>
                <th></th>
                {detailed.daily.time.map((time) => {
                  const value = time.split("-");
                  return <th className="pb-3">{value[1] + "-" + value[2]}</th>;
                })}
              </tr>
              <tr>
                <th className="text-left pl-2 font-serif text-lg">Sunrise</th>
                {detailed.daily.sunrise.map((time) => {
                  const value = time.split("T");
                  return (
                    <th className="font-mono text-left pl-8">
                      {value[1] + " "}AM
                    </th>
                  );
                })}
              </tr>
              <tr>
                <th className="text-left pl-2 font-serif text-lg">Sunset</th>
                {detailed.daily.sunset.map((time) => {
                  const value = time.split("T");
                  return (
                    <th className="font-mono text-left pl-8">
                      {value[1] + " "}PM
                    </th>
                  );
                })}
              </tr>
              <tr>
                <th className="text-left pl-2 font-serif text-lg">
                  Max Temperature
                </th>
                {detailed.daily.temperature_2m_max.map((time) => {
                  return (
                    <th className="font-mono text-left pl-8">{time + " "}°C</th>
                  );
                })}
              </tr>
              <tr>
                <th className="text-left pl-2 font-serif text-lg mr-5">
                  Min Temperature
                </th>
                {detailed.daily.temperature_2m_min.map((time) => {
                  return (
                    <th className="font-mono text-left pl-8">{time + " "}°C</th>
                  );
                })}
              </tr>
              <tr>
                <th className="text-left pl-2 font-serif text-lg">Rain</th>
                {detailed.daily.rain_sum.map((time) => {
                  return (
                    <th className="font-mono text-left pl-8">{time + " "}mm</th>
                  );
                })}
              </tr>
            </table>
          )}
        </div>
      </div>
    );
  }
};

export default City;
