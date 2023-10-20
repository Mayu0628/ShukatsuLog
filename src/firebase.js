import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVV5z4iV5Xs2NaEpcDeBaYkTKpMSDyIXU",
  authDomain: "blog-51c3e.firebaseapp.com",
  projectId: "blog-51c3e",
  storageBucket: "blog-51c3e.appspot.com",
  messagingSenderId: "78955368058",
  appId: "1:78955368058:web:50b9a38d33980f808e35c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//認証の初期化
const auth = getAuth(app);
//インスタンス化(GoogleAuthProviderクラスを実体で使うための動作？)
const provider = new GoogleAuthProvider();
//データベースの初期化 TODO firebaseドキュメント見る
const db = getFirestore(app);

export { auth, provider, db };
