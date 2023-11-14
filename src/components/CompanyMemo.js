import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CompanyMemo = ({ isAuth }) => {
  const [titles, setTitles] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [postText, setPostText] = useState("");

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

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>メモを追加する</h1>
        <div className="inputPost">
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
          <div>投稿</div>
          <textarea
            placeholder="投稿内容を入力"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <Link to="/companypost">
          <button className="postButton" onClick={createPost}>
            記録
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyMemo;
