import React from 'react';

function NewsNav() {
  const newsItems = [
    "Thời sự", "Góc nhìn", "Thế giới", "Video", "Podcasts", "Kinh doanh",
    "Bất động sản", "Khoa học", "Giải trí", "Thể thao", "Euro 2024",
    "Pháp luật", "Giáo dục", "Sức khỏe", "Đời sống", "Du lịch", "Số hóa",
    "Xe", "Ý kiến", "Tâm sự"
  ];

  return (
    <nav className="nav-news">
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <div className="list-news">
        <ul className="nav-list">
          {newsItems.map((item, index) => (
            <li key={index} className="nav-item"><a href={`#${item}`}>{item}</a></li>
          ))}
        </ul>
      </div>
      <label htmlFor="menu-toggle" className="menu-button">&#9776;</label>
    </nav>
  );
}

export default NewsNav;