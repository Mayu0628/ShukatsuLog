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
  // 認証状態を管理する
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  // 認証が必要なルートのレンダリングを担当する関数
  const renderAuthRoute = (Component) => {
    // 認証されている場合は指定されたコンポーネントを、そうでなければLPページにリダイレクト
    return isAuth ? <Component isAuth={isAuth} /> : <Navigate to="/lp" />;
  };

  // サイドバーの表示を制御するロジック
  const sidebar = isAuth ? <Slidebar isAuth={isAuth} /> : null;

  // LPページへのアクセスを制御する関数
  const renderLpOrRedirect = () => {
    // 認証されている場合はホームページにリダイレクトし、そうでない場合はLPを表示
    return isAuth ? <Navigate to="/" /> : <Lp />;
  };

  return (
    <Router>
      <Navbar setIsAuth={setIsAuth} />
      <div className="main-content">
        {sidebar}
        <Routes>
          {/* 各ルートの設定 */}
          <Route path="/lp" element={renderLpOrRedirect()}/>
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
