import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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

  const renderAuthRoute = (Component) => {
    return isAuth ? <Component isAuth={isAuth} /> : <Navigate to="/lp" />;
  };

  const sidebar = isAuth ? <Slidebar isAuth={isAuth} /> : null;

  return (
    <Router>
      <Navbar setIsAuth={setIsAuth} />
      <div className="main-content">
        {sidebar}
        <Routes>
          <Route path="/lp" element={<Lp />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
          <Route path="/" element={renderAuthRoute(Home)} />
          <Route path="/companylist" element={renderAuthRoute(CompanyList)} />
          <Route
            path="/:id"
            element={isAuth ? <CompanyData /> : <Navigate to="/lp" />}
          />
          <Route path="/companymemo" element={renderAuthRoute(CompanyMemo)} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
