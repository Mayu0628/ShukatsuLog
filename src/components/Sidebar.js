import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./css/Sidebar.css";
import { faHouse, faBuilding } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(collection(db, "posts"));
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        setError("データの取得中にエラーが発生しました。");
        console.error("データ取得エラー:", err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="Sidebar">
      <div className="Sidebar_nav">
        <Link to="/">
          <div className="nav-item">
            <FontAwesomeIcon icon={faHouse} className="fa-svg"/>
            <span>ホーム</span>
          </div>
        </Link>
        <Link to="/companymemo">
          <div className="nav-item">
            <FontAwesomeIcon icon={faBuilding} className="fa-svg"/>
            <span>メモする</span>
          </div>
        </Link>
      </div>
      <div className="company_header">企業一覧</div>
      {error && <div className="error-message">{error}</div>}
      <ul className="companyList">
        {posts.map((post) => (
          <li key={post.id} className="title">
            <Link to={`/${post.id}`}>
              <img
                src={post.url.image}
                alt={post.url.title}
                className="company_img_icon"
              />
              <span>{post.title}</span>
            </Link>
            <div className="detail-button">
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="faCaretDown"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
