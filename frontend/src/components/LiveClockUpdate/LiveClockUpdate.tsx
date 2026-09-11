'use client';

import React, { useEffect, useState } from 'react';

const LiveClockUpdate: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <p suppressHydrationWarning>{time || '--:--:--'}</p>
    </div>
  );
};

export default LiveClockUpdate;
