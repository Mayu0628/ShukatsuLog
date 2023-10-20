import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import "./css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Home = () => {
  const [postList, setpostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setpostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  //投稿削除
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.reload();
  };

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
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
                  <img src={post.url.image} alt="" />
                  <h4>{post.url.title}</h4>
                </a>
              </div>
            )}
            {/* <div className="body">投稿：{post.postText}</div> */}
            <div className="footer">
              <div className="buttons">
                {post.author.id === auth.currentUser?.uid && (
                  <button
                    className="delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="faTrashAlt" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
