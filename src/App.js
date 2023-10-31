import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import CompanyList from "./components/CompanyList";
import Slidebar from "./components/Sidebar";
import CompanyData from "./components/CompanyData";
import CompanyMemo from "./components/CompanyMemo";
import Lp from "./components/Lp";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <div className="main-content">
        <Slidebar isAuth={isAuth} />
        <Routes>
          <Route path="/lp" element={<Lp />} />
          <Route path="/" element={<Home isAuth={isAuth}/>} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
          <Route
            path="/companylist"
            element={<CompanyList isAuth={isAuth} />}
          />
          <Route path="/:id" element={<CompanyData />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route
            path="/companymemo"
            element={<CompanyMemo isAuth={isAuth} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
