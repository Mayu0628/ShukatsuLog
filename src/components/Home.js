import React, { useEffect, useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./css/Home.css";

export const Home = () => {
  const [title, setTitle] = useState(""); // 入力されたタイトルを保持
  const [urlInput, setUrlInput] = useState(""); // 入力されたURLを保持
  const [urlData, setUrlData] = useState(null); // URLから取得したデータを保持
  const [error, setError] = useState(""); // エラー用のステート

  useEffect(() => {
    const fetchData = async () => {
      // urlInputが空の場合は何もしない
      if (!urlInput) return;

      const data = {
        key: "c5c75cc8e60e6bd554b556a03066c66e",
        q: urlInput,
      };

      try {
        const response = await fetch("https://api.linkpreview.net", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("データ取得に失敗しました");

        const json = await response.json();
        setUrlData(json);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [urlInput]);  // 依存配列にurlInputを指定

  const createPost = async () => {
    // ログインしてない場合
    if (!auth.currentUser) {
      setError("ログインが必要です");
      return;
    }

    try {
      const q = query(collection(db, "posts"), where("title", "==", title));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("このタイトルはすでに存在します");
        return;
      }

      await addDoc(collection(db, "posts"), {
        title,
        url: {
          image: urlData?.image ,
          title: urlData?.title,
          url: urlData?.url,
        },
        author: {
          username: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });

      setTitle("");
      setUrlInput("");
      setUrlData(null);
      window.alert("投稿が追加されました");
    } catch (error) {
      setError("投稿の追加に失敗しました: " + error.message);
    }
    window.location.reload(); // ページをリロード
  };

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h2>企業を追加する</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="inputPost">
          <div>会社名</div>
          <input
            type="text"
            placeholder="企業名"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputPost">
          <div>URL</div>
          <input
            type="text"
            placeholder="URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </div>
        <button className="createPostButton" onClick={createPost}>
          追加
        </button>
      </div>
    </div>
  );
};

export default Home;
