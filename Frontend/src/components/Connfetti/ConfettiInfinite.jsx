import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const ConfettiInfinite = () => { // Fixed function declaration
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={400}
      recycle = {false}
    />
  );
};

export default ConfettiInfinite;