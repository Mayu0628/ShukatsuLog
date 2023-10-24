import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import "./css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Home = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      // ログインしているユーザーのIDを取得
      const userId = auth.currentUser?.uid;
      if (userId) {
        // ログインしているユーザーが投稿した投稿のみを取得するクエリを作成
        const userPostsQuery = query(
          collection(db, "posts"),
          where("author.id", "==", userId)
        );
        // クエリを実行
        const data = await getDocs(userPostsQuery);
        // 取得したデータをステートにセット
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };
    getPosts();
  }, []);

  //投稿削除
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setPostList((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="homePage">
      {postList.map((post) => (
        <div className="post" key={post.id}>
          <div className="header">
            <Link to={`/${post.id}`}>
              <h3 className="title">{post.title}</h3>
            </Link>
            <Link to="/companypost">
              <button className="edit">追加</button>
            </Link>
          </div>
          {post.url && post.url.image && (
            <div className="urlData">
              <a
                href={post.url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="urlLink"
              >
                <img src={post.url.image} alt={post.url.title} />
                <h4>{post.url.title}</h4>
              </a>
            </div>
          )}
          <div className="footer">
            <div className="buttons">
              <button
                className="delete"
                onClick={() => handleDelete(post.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="faTrashAlt" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
