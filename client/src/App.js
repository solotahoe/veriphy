import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import Register from "./screens/Forms";
import Zing from "./screens/Zing";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Register />} />
          <Route path="/dashboard/:id" exact={true} element={<Dashboard />} />
          <Route path="/do" exact={true} element={<Zing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
