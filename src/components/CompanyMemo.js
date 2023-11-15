import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./css/CompanyMemo.css";

const CompanyMemo = ({ isAuth }) => {
  const [titles, setTitles] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [postText, setPostText] = useState(""); // 入力されたテキストを保持
  const [previewText, setPreviewText] = useState(""); // プレビュー用のテキスト

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const getPosts = async () => {
      const postsQuery = query(
        collection(db, "posts"),
        where("author.id", "==", auth.currentUser.uid)
      );
      const data = await getDocs(postsQuery);

      const titlesArray = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTitles(titlesArray);

      if (titlesArray.length > 0) {
        setSelectedCompanyName(titlesArray[0].title);
      }
    };

    getPosts();
  }, [isAuth, navigate]);

  const createPost = async () => {
    if (!postText) {
      alert("投稿内容を入力してください。");
      return;
    }

    try {
      const currentDate = new Date();
      await addDoc(collection(db, "companymemo"), {
        title: selectedCompanyName,
        postText: postText,
        author: {
          username: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        createdAt: currentDate,
      });

      navigate("/");
    } catch (error) {
      console.error("投稿の作成中にエラーが発生しました", error);
      alert("投稿の作成中にエラーが発生しました。再試行してください。");
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setPostText(newText);
    setPreviewText(newText); // 入力されたテキストをプレビュー用の状態にもセット
  };

  return (
    <div className="CompanyMemo">
      <div className="memoContainer">
        <div className="CreateMemo">
          <h2>メモを追加する</h2>
          <div className="inputMemo">
            <select
              value={selectedCompanyName}
              onChange={(e) => setSelectedCompanyName(e.target.value)}
            >
              {titles.map((titleObj, index) => (
                <option key={index} value={titleObj.title}>
                  {titleObj.title}
                </option>
              ))}
            </select>
            <textarea
              placeholder="投稿内容を入力"
              value={postText}
              onChange={handleTextChange}
            />
            <button className="postButton" onClick={createPost}>
              記録
            </button>
          </div>
        </div>

        <div className="previewContainer">
          <h2>プレビュー</h2>
          <ReactMarkdown>{previewText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default CompanyMemo;
