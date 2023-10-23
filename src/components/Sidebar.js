import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./css/Sidebar.css";

const Sidebar = ({ isAuth }) => {
  const [companyName, setCompanyName] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(collection(db, "posts"));
        setCompanyName(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        setError("データの取得中にエラーが発生しました。");
        console.error("データ取得エラー:", err);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      {isAuth && ( // ログインしている場合のみ以下の内容をレンダリング
        <div className="Sidebar">
          <div className="company_header">
            企業一覧
            <Link to="/createpost">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          {error && <div className="error-message">{error}</div>}
          <ul className="companyList">
            {companyName.map((post) => (
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
      )}
    </>
  );
};

export default Sidebar;
