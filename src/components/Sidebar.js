import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './css/Sidebar.css';
import { auth } from '../firebase';

const Sidebar = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  // const [user] = useAuthState(auth); // react-firebase-hooksの場合

  useEffect(() => {
    const getPosts = async (uid) => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('author.id', '==', uid));
        const querySnapshot = await getDocs(q);
        setPosts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        setError('データの取得中にエラーが発生しました。');
        console.error('データ取得エラー:', err);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getPosts(user.uid);
      } else {
        setError('ログインしているアカウントの投稿のみを表示することができます。');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="Sidebar">
      <div className="Sidebar_nav">
        <Link to="/">
          <div className="nav-item">
            <FontAwesomeIcon icon={faHouse} className="fa-svg" />
            <span>ホーム</span>
          </div>
        </Link>
        <Link to="/companymemo">
          <div className="nav-item">
            <FontAwesomeIcon icon={faBuilding} className="fa-svg" />
            <span>メモする</span>
          </div>
        </Link>
      </div>
      <div className="company_header">企業一覧</div>
      {error && <div className="error-message">{error}</div>}
      <ul className="companyList">
        {posts.map((post) => (
          <li key={post.id} className="title">
            <Link to={`/${post.id}`}>
              <img
                src={post.url.image}
                alt={post.url.title}
                className="company_img_icon"
              />
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
