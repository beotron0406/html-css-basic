import React from 'react';
import { Link } from 'react-router-dom';

function WebNews() {
  return (
    <div>
      <h1>Trang Chủ</h1>
      <p>Chào mừng đến với trang web của chúng tôi!</p>
      <Link to="./News">
        <button>Xem Tin Tức</button>
      </Link>
    </div>
  );
}

export default WebNews;