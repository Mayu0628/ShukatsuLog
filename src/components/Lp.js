import React from "react";
import "./css/LP.css";

const Lp = () => {
  return (
    <div className="lp-container">
      {/* メインセクション */}
      <section className="main-section">
        <h1>就活をスムーズに</h1>
        <p>あなたの就活をサポートするアプリです</p>
      </section>

      {/* 特徴セクション */}
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

      {/* テストモニタルの声セクション */}
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
        <p>&copy; 2023 就活ログ</p>
        <ul>
          <li>
            <a href="#privacy">プライバシーポリシー</a>
          </li>
          <li>
            <a href="#terms">利用規約</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Lp;
