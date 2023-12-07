import React, { useState, useEffect } from 'react';
import ConfettiSuccess from './Connfetti/ConfettiSuccess'; // Import the ConfettiSuccess component

const Timer = () => {
  const [mainProgress, setMainProgress] = useState(0);

  // Simulate a progress update (e.g., from 0% to 100%)
  useEffect(() => {
    const timer = setInterval(() => {
      setMainProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : 100
      );
    }, 500);

    // Clear the interval after 5 seconds (5000ms)
    setTimeout(() => {
      clearInterval(timer);
    }, 5000);
  }, []);

  return (
    <div>
      {/* Render the ConfettiSuccess component and pass mainProgress as a prop */}
      <ConfettiSuccess mainProgress={mainProgress} />
    </div>
  );
};

export default Timer;
