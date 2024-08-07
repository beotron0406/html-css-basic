import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../News/NavBar";
import NewsNav from "../News/NewsNav";
import MainContent from "../News/MainContent";

function NewsPage() {
  return (
    <div className="news-page">
      <Navbar />
      <div className="news-content">
        <div className="back-to-home">
          <Link to="/" className="btn-back">
            Quay lại Trang Chủ
          </Link>
        </div>
        <NewsNav />
        <MainContent />
      </div>
    </div>
  );
}

export default NewsPage;
