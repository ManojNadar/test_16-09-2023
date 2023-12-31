import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import AddQuiz from "./Components/Quiz/AddQuiz";
import SolveQuiz from "./Components/Quiz/SolveQuiz";
import GetResult from "./Components/Quiz/GetResult";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/addquiz" element={<AddQuiz />} />
        <Route exact path="/solvequiz" element={<SolveQuiz />} />
        <Route exact path="/getresult" element={<GetResult />} />
      </Routes>
    </div>
  );
}

export default App;
