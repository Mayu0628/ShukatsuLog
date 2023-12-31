import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { auth, provider, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./css/Navbar.css";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const logInWithGoogle = async () => {
    try {
      // Googleでログイン
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ログイン情報をlocalStorageに保存
      localStorage.setItem("isAuth", true);
      setIsAuth(true);

      // ユーザー情報をFirestoreのusersコレクションに保存
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }, { merge: true }); // ドキュメントが既に存在する場合はマージ

      // ホームページにリダイレクト
      navigate("/");
    } catch (error) {
      console.error("ログイン中にエラーが発生しました:", error);
      alert("ログインに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className="account">
      <button onClick={logInWithGoogle}>ログイン</button>
    </div>
  );
};

export default Login;
