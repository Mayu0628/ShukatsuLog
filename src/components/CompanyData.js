import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./css/CompanyData.css";

function CompanyData() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [matchingMemos, setMatchingMemos] = useState([]);
  const [editMemoId, setEditMemoId] = useState(null);
  const [editText, setEditText] = useState("");

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

  const startEdit = (memo) => {
    setEditMemoId(memo.id);
    setEditText(memo.postText);
  };

  const saveEdit = async () => {
    await updateDoc(doc(db, "companymemo", editMemoId), {
      postText: editText,
    });
    setEditMemoId(null);
    setEditText("");
    window.location.reload();
  };

  const cancelEdit = () => {
    setEditMemoId(null);
    setEditText("");
  };

  return (
    <div className="CompanyData">
      {data ? (
        <>
          <div className="CompanyData_header">
            <header>{data.title}</header>
            <Link to="/companymemo">
              <button>追加</button>
            </Link>
            <button onClick={companyDelete}>削除</button>
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
                {editMemoId === memo.id ? (
                  <>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={saveEdit}>保存</button>
                    <button onClick={cancelEdit}>キャンセル</button>
                  </>
                ) : (
                  <>
                    <p>{memo.postText}</p>
                    <button onClick={() => startEdit(memo)}>編集</button>
                    <button onClick={() => companymemoDelete(memo.id)}>
                      削除
                    </button>
                  </>
                )}
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
