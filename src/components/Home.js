import React, { useEffect, useState, useCallback } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./css/CreatePost.css";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [urlData, setUrlData] = useState(null);

  const fetchData = useCallback(async () => {
    if (!urlInput) {
      return;
    }

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
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response;
      });

      console.log(response);
      const json = await response.json();

      setUrlData(json);
    } catch (error) {
      console.log(error);
      console.error("Error fetching data: ", error);
      alert("エラーが発生しました。再度試してください。");
    }
  }, [urlInput]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timerId);
  }, [urlInput, fetchData]);

  const createPost = async () => {
    if (!auth.currentUser) {
      alert("ログインしてください");
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
    window.location.reload();
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
        <button className="createPostButton" onClick={createPost}>
          記録
        </button>
      </div>
    </div>
  );
};

export default Home;
