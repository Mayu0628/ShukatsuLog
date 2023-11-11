import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import "./css/Navbar.css";
import { db, auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";
import Logout from "./Logout";
import Logo from "../assets/Logo.jpeg";

function Navbar({ setIsAuth }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // 認証状態のリスナーをセットアップ
  useEffect(() => {
    // onAuthStateChanged は認証状態が変わるたびに呼ばれる
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // ユーザーがログインしている場合の処理
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUser({ ...docSnap.data(), id: docSnap.id });
              setIsAuth(true); // 認証状態を更新
            } else {
              // ドキュメントが存在しない場合
              setError("ユーザーが見つかりません");
            }
          })
          .catch((err) => {
            // エラーが発生した場合
            setError("データの取得中にエラーが発生しました。");
            console.error("データ取得エラー:", err);
          });
      } else {
        // ユーザーがログアウトしている場合の処理
        setUser(null);
        setIsAuth(false);
      }
    });

    // コンポーネントのクリーンアップ時にリスナーを解除
    return () => unsubscribe();
  }, [setIsAuth]);

  return (
    <nav>
      <div className="Logo">
        <img src={Logo} alt="Logo"></img>
      </div>
      {user ? (
        <div className="user-section">
          <Logout setIsAuth={setIsAuth}>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </Logout>
          <div className="user-profile">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="user-img-icon"
            />
          </div>
        </div>
      ) : (
        <div className="user-section">
          <Login setIsAuth={setIsAuth}>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </Login>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </nav>
  );
}

export default Navbar;
