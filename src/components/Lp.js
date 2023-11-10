import React from "react";
import "./css/LP.css";
import githubMark from "../assets/github-mark.png";

const Lp = () => {
  return (
    <div className="lp-container">
      <section className="main-section">
        <h1>就活をスムーズに</h1>
        <p>就活の記録を残せるアプリです</p>
      </section>

      <section className="features-section" id="features">
        <h2>特徴</h2>
        <div className="feature">
          <h3>特徴1</h3>
          <p>説明文</p>
        </div>
        <div className="feature">
          <h3>特徴2</h3>
          <p>説明文</p>
        </div>
        <div className="feature">
          <h3>特徴3</h3>
          <p>説明文</p>
        </div>
      </section>
      
      <section className="testimonials-section" id="testimonials">
        <h2>ユーザーの声</h2>
        <blockquote>
          <p>「このアプリは就活を非常に楽にしてくれました！」</p>
          <cite>- ユーザーA</cite>
        </blockquote>
        <blockquote>
          <p>「オススメのアプリです！」</p>
          <cite>- ユーザーB</cite>
        </blockquote>
      </section>

      {/* フッター */}
      <footer>
        <p>&copy; 就活ログ</p>
        <ul>
          <li>Mayu0628</li>
          <img src={githubMark} alt="GitHub Mark"></img>
        </ul>
      </footer>
    </div>
  );
};

export default Lp;
