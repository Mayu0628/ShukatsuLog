import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CompanyMemo = ({ isAuth }) => {
  const [titles, setTitles] = useState([]);
  const [SelectedCompanyName, setSelectedCompanyName] = useState("");
  const [postText, setPostText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      const titlesArray = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTitles(titlesArray);
      // titlesArrayが空でない場合、SelectedCompanyNameを最初のタイトルで初期化
      if (titlesArray.length > 0) {
        setSelectedCompanyName(titlesArray[0].title);
      }
    };
    getPosts();
  }, []);

  const createPost = async () => {
    await addDoc(collection(db, "companymemo"), {
      title: SelectedCompanyName,
      postText: postText,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });

    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>メモを追加する</h1>
        <div className="inputPost">
          <select onChange={(e) => setSelectedCompanyName(e.target.value)}>
            {titles.map((titleObj, index) => (
              <option key={index} value={titleObj.title}>
                {titleObj.title}
              </option>
            ))}
          </select>
          <div>投稿</div>
          <textarea
            placeholder="投稿内容をを記入"
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
