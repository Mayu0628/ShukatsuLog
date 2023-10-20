import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";

function CompanyData() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [matchingMemos, setMatchingMemos] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, "posts", id);
      const postSnapshot = await getDoc(postDoc);

      if (postSnapshot.exists()) {
        setData({ ...postSnapshot.data(), id: postSnapshot.id });

        // posts の title に一致する companymemo を取得
        const memoQuery = query(
          collection(db, "companymemo"),
          where("title", "==", postSnapshot.data().title)
        );
        const memoSnapshot = await getDocs(memoQuery);
        setMatchingMemos(memoSnapshot.docs.map((doc) => doc.data()));
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      {data ? (
        <>
          <h1>{data.title}</h1>
          {matchingMemos.map((memo, index) => (
            <div key={index}>
              <p>{memo.title}</p>
              <p>{memo.postText}</p>
            </div>
          ))}
          <Link to="/companymemo">
            {" "}
            <button>追加</button>
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CompanyData;
