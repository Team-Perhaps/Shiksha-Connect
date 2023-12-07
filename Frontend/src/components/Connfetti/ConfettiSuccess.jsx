import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const ConfettiSuccess = (mainProgress) => {
  const { width, height } = useWindowSize();

  return (
    <div>
      {/* Use the mainProgress prop in your Confetti component */}
      {mainProgress === 100 && (
        <Confetti width={width} height={height} />
      )}
    </div>
  );
};

export default ConfettiSuccess;