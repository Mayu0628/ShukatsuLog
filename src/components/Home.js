import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import "./css/CreatePost.css";

export const Home = () => {
  const [title, setTitle] = useState("");

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

  const createPost = async () => {
    try {
      // Firestoreからtitleが一致するドキュメントを検索
      const q = query(collection(db, "posts"), where("title", "==", title));
      const querySnapshot = await getDocs(q);

      // ドキュメントが存在する場合はアラートを表示して終了
      if (!querySnapshot.empty) {
        alert("すでに登録されています");
        return;
      }

      // ドキュメントが存在しない場合はデータベースに追加
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

      alert("追加しました");
      window.location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("エラーが発生しました。再度試してください。");
    }
  };

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
