import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Board from "./components/Board/Board";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicket } from "./store/slices/dataSlice";
function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.data.isLoading);
  const data = useSelector((state) => state.data.data);
  useEffect(() => {
    dispatch(fetchTicket());
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">{!isLoading && data && <Board />}</div>
    </>
  );
}

export default App;
