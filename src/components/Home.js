import React, { useEffect, useState, useCallback } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./css/CreatePost.css";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [urlData, setUrlData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!urlInput) return;

    setIsLoading(true);

    const data = {
      key: process.env.REACT_APP_LINK_PREVIEW_API_KEY,
      q: urlInput,
    };

    try {
      const response = await fetch("https://api.linkpreview.net", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("API response was not ok", response);
        alert("URLの取得に失敗しました。");
        return;
      }

      const json = await response.json();

      if (
        typeof json.image !== "string" ||
        typeof json.title !== "string" ||
        typeof json.url !== "string"
      ) {
        console.error("Invalid response format", json);
        alert("取得したデータの形式が正しくありません。");
        return;
      }

      setUrlData(json);
    } catch (error) {
      console.error("Error fetching data", error);
      alert("データの取得中にエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  }, [urlInput]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchData();
    }, 500); // 500ミリ秒のデバウンス時間
    return () => clearTimeout(timerId);
  }, [urlInput, fetchData]);

  const createPost = async () => {
    if (!auth.currentUser) {
      alert("ログインしてください");
      return;
    }

    if (isLoading) {
      alert("データをロード中です。しばらく待ってから再度試してください。");
      return;
    }

    try {
      const q = query(collection(db, "posts"), where("title", "==", title));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("すでに登録されています");
        return;
      }

      await addDoc(collection(db, "posts"), {
        title: title,
        url: {
          image: urlData?.image || "../assets/No_image.jpeg",
          title: urlData?.title,
          url: urlData?.url,
        },
        author: {
          username: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });

      alert("追加しました");
      setTitle("");
      setUrlInput("");
      setUrlData(null);
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
        {isLoading && <div>Loading...</div>}
        <button className="createPostButton" onClick={createPost}>
          記録
        </button>
      </div>
    </div>
  );
};

export default Home;
