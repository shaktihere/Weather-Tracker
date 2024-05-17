import { useDispatch } from "react-redux";
import { onclick } from "../utils/addButtonSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(onclick());
  };
  return (
    <div className="flex justify-evenly bg-white p-4 fixed top-0 w-full shadow-md">
      <h1 className="font-extrabold text-xl text-yellow-700">
        Welcome to Weather Tracker application
      </h1>
      <button
        type="submit"
        className="bg-green-200 px-4 rounded-md hover:bg-green-400 shadow-md hover:shadow-2xl font-semibold"
        onClick={handleClick}
      >
        ADD
      </button>
    </div>
  );
};

export default Dashboard;
