import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  return (
    <div>
      <h2>Timer: {seconds} seconds</h2>
      <button onClick={() => setIsRunning((prevIsRunning) => !prevIsRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

export default Timer;
