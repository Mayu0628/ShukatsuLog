import React from "react";
import "./css/LP.css";
import githubMark from "../assets/github-mark.png";
import Sample1 from "../assets/sample1.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faPen } from "@fortawesome/free-solid-svg-icons";

const Lp = () => {
  return (
    <div className="lp-container">
      <section className="main-section">
        <div className="left-container">
          <img src={Sample1} alt="Sample1"></img>
        </div>
        <div className="right-container">
          <h1>
            記録は力なり。
            <br />
            就活ログで夢への一歩を確実に
          </h1>
          <p>就活の記録を残せるWebアプリケーションです</p>
        </div>
      </section>

      <section className="features-section" id="features">
        <h2>特徴</h2>
        <div className="features">
          <div className="feature">
            <h3>企業を登録することができる</h3>
            <FontAwesomeIcon icon={faBuilding} className="icon" />
          </div>
          <div className="feature">
            <h3>企業の就活記録を登録することができる</h3>
            <FontAwesomeIcon icon={faPen} className="icon" />
          </div>
        </div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <h2>開発のきっかけ</h2>
        <h4>
          サマーインターン選考時に、面接の記録が様々なアプリに分散してしまったため、
          <br />
          就活記録用のメモ帳を開発した。
        </h4>
      </section>

      {/* フッター */}
      <footer>
        <p>&copy; 就活ログ</p>
        <ul>
          <li>Mayu0628</li>
          <a
            href="https://github.com/Mayu0628"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={githubMark} alt="githubMark"></img>
          </a>
        </ul>
      </footer>
    </div>
  );
};

export default Lp;
