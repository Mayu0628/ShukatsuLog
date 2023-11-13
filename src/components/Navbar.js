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

  // useEffectフックを使用して、コンポーネントのマウント時にFirebaseの認証リスナーを設定します。
  useEffect(() => {
    // onAuthStateChangedは、認証状態の変更を監視するリスナーです。
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // ユーザーがログインしている場合、Firebaseデータベースからユーザーデータを取得します。
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              // ドキュメントが存在する場合、ユーザー情報をセットします。
              setUser({ ...docSnap.data(), id: docSnap.id });
              setIsAuth(true); // 認証状態をtrueに設定します。
            } else {
              // ユーザードキュメントが存在しない場合、エラーメッセージを設定します。
              setError("ユーザーが見つかりません");
            }
          })
          .catch((err) => {
            // データ取得中にエラーが発生した場合、エラーメッセージを設定します。
            setError("データの取得中にエラーが発生しました。");
            console.error("データ取得エラー:", err);
          });
      } else {
        // ユーザーがログアウトしている場合、ユーザー情報をnullに設定し、認証状態をfalseに設定します。
        setUser(null);
        setIsAuth(false);
      }
    });

    // コンポーネントのアンマウント時にリスナーを解除します。
    return () => unsubscribe();
  }, [setIsAuth]);

  return (
    <nav>
      <div className="Logo">
        <img src={Logo} alt="Logo"></img>
      </div>
      {user ? (
        // ユーザーがログインしている場合、Logoutコンポーネントとユーザープロファイルを表示します。
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
        // ユーザーがログアウトしている場合、Loginコンポーネントを表示します。
        <div className="user-section">
          <Login setIsAuth={setIsAuth}>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </Login>
        </div>
      )}
      {/* // エラーがある場合、エラーメッセージを表示します。 */}
      {error && <div className="error-message">{error}</div>}
    </nav>
  );
}

export default Navbar;
