import React from "react";
import Welcome from "./component/Welcome";
import Counter from "./component/Counter";
import Counter2 from "./component/Counter2";
import Timer from "./component/Timer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebNews from "./component/WebNews";
import NewsPage from "./component/NewPage";
function App() {
  return (
    <>
    <div>
        <div className="App">
          <Router>
            <div className="app-container">
              <Routes>
                <Route path="/" element={<WebNews />} />
                <Route path="/news" element={<NewsPage />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
      <Welcome />
      <div className="App">
        <Counter />
      </div>
      <div className="App">
        <Counter2 />
      </div>
      <div className="App">
        <Timer />
      </div>
      
    </>
  );
}

export default App;
