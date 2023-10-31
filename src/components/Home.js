import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import "./css/CreatePost.css";
import { useNavigate } from "react-router-dom";

export const Home = ({ isAuth }) => {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  //リンクレビューAPIを使用して、URLからメタデータを取得する
  const [urlInput, setUrlInput] = useState(""); // 入力されたURLを管理するステート
  const [urlData, setUrlData] = useState(null); // APIから取得したデータを管理するステート
  // リンクレビューAPIを使用して、URLからメタデータを取得する
  useEffect(() => {
    if (!urlInput) return; // urlInputが空か未設定の場合は、何もしない

    const fetchData = async () => {
      const data = {
        key: "b301954b87b475dc5138f0c5844b79ca",
        q: urlInput,
      };

      const response = await fetch("https://api.linkpreview.net", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
      });

      const json = await response.json();
      setUrlData(json); // 取得したデータをurlData stateに設定
    };

    fetchData();
  }, [urlInput]); // useEffectはurlInputが変更されるたびにトリガーされる

  //データベースに投稿を追加する
  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      title: title,
      // postText: postText,
      url: {
        image: urlData?.image, // オプショナルチェイニングを使用
        title: urlData?.title,
        url: urlData?.url,
      },
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });

    navigate("/");
  };

  //ユーザーが認証されていない場合、ログインページにリダイレクトする
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h2>企業を追加する</h2>
        <div className="inputPost">
          <div>会社名</div>
          <input
            type="text"
            placeholder="企業名"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputPost">
          <div>URL</div>
          <input
            type="text"
            placeholder="URL"
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </div>
        <button className="createPostButton" onClick={createPost}>
          記録
        </button>
      </div>
    </div>
  );
};

export default Home;
