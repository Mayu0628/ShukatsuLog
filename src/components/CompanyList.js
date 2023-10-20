import {
  collection,
  //  deleteDoc, doc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "./css/Home.css";

const CompanyList = () => {
  const [postList, setpostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setpostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  // const handleDelete = async (id) => {
  //   await deleteDoc(doc(db, "posts", id));
  //   window.location.reload();
  // };

  console.log(postList);

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="post" key={post.id}>
            <img src={post.url.image} alt="" />
            <h3 className="title">{post.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyList;
