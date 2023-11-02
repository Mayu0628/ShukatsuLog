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
        const memos = memoSnapshot.docs.map((doc) => doc.data());
        setMatchingMemos(memos);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="CompanyData">
      {data ? (
        <>
          <div className="CompanyData_header">
            <header>{data.title}</header>
            <Link to="/companymemo">
              <button>追加</button>
            </Link>
          </div>
          {matchingMemos.map((memo, index) => {
            // ここで createdAt を変換し、フォーマットする
            const createdAt = memo.createdAt?.toDate(); // JavaScript の Date オブジェクトに変換
            const formattedDate = createdAt?.toLocaleDateString(); // ロケールに応じた形式で日付をフォーマット
            const formattedTime = createdAt?.toLocaleTimeString(); // ロケールに応じた形式で時刻をフォーマット
            return (
              <div key={index} className="post">
                {createdAt && <p>投稿日時: {formattedDate} {formattedTime}</p>}
                <p>{memo.postText}</p>
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
