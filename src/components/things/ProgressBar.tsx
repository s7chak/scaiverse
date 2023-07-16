import React, { useRef, useEffect, useState } from 'react';

const ProgressBar = () => {
  const filledRef = useRef<HTMLDivElement>(null);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    if (scrollPercentage >= 25) {
      setShowProgressBar(true);
    } else {
      setShowProgressBar(false);
    }
    if (filledRef.current) {
      filledRef.current.style.height = `${scrollPercentage}%`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`progress-bar ${showProgressBar ? '' : 'hid'}`}>
      <div ref={filledRef} className="filled"></div>
    </div>
  );
};

export default ProgressBar;
