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
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import "./css/CompanyData.css";

function CompanyData() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [matchingMemos, setMatchingMemos] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, "posts", id);
      const postSnapshot = await getDoc(postDoc);

      if (postSnapshot.exists()) {
        const postData = { ...postSnapshot.data(), id: postSnapshot.id };
        setData(postData);

        const memoQuery = query(
          collection(db, "companymemo"),
          where("title", "==", postData.title)
        );
        const memoSnapshot = await getDocs(memoQuery);
        const memos = memoSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatchingMemos(memos);
      }
    };

    fetchPost();
  }, [id]);

  const companyDelete = async () => {
    await deleteDoc(doc(db, "posts", data.id));
    window.location.reload();
  };

  const companymemoDelete = async (memoId) => {
    await deleteDoc(doc(db, "companymemo", memoId));
    window.location.reload();
  };

  return (
    <div className="CompanyData">
      {data ? (
        <>
          <div className="CompanyData_header">
            <header>{data.title}</header>
            <Link to="/companymemo">
              <button>追加</button>
              <button onClick={companyDelete}>削除</button>
            </Link>
          </div>
          {matchingMemos.map((memo, index) => {
            const createdAt = memo.createdAt?.toDate();
            const formattedDate = createdAt?.toLocaleDateString();
            const formattedTime = createdAt?.toLocaleTimeString();
            return (
              <div key={index} className="post">
                {createdAt && (
                  <p>
                    投稿日時: {formattedDate} {formattedTime}
                  </p>
                )}
                <p>{memo.postText}</p>
                <button onClick={() => companymemoDelete(memo.id)}>削除</button>
              </div>
            );
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CompanyData;
