import React from "react";
import { useState, useEffect } from "react";

function Counter2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Bạn đã bấm ${count} lần`;
  });

  return (
    <>
      <p>bấm {count} lần</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </>
  );
}
export default Counter2;
