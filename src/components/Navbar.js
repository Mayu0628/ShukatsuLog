import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import { db, auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRightToBracket,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ isAuth }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuth) {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userRef = doc(db, "users", userId);
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUser({ ...docSnap.data(), id: docSnap.id });
            } else {
              setError("ユーザーが見つかりません");
            }
          })
          .catch((err) => {
            setError("データの取得中にエラーが発生しました。");
            console.error("データ取得エラー:", err);
          });
      }
    }
  }, [isAuth]);

  return (
    <nav>
      {!isAuth ? (
        <Link to="/login">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          ログイン
        </Link>
      ) : (
        <>
          <div className="user-profile">
            {user && (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="user_img_icon"
              />
            )}
            {error && <div className="error-message">{error}</div>}
          </div>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} />
            ホーム
          </Link>
          <Link to="/companymemo">
            <FontAwesomeIcon icon={faBuilding} />
            メモする
          </Link>
          <Link to="/logout">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            ログアウト
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
