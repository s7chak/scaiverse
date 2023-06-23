import React, { useEffect, useState } from "react";

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex === text.length) {
        clearInterval(intervalId);
        setIsTyping(false);
        setTimeout(() => {
          let reverseIndex = text.length;

          const reverseIntervalId = setInterval(() => {
            if (reverseIndex === -1) {
              clearInterval(reverseIntervalId);
              setIsTyping(true);
              setDisplayText("");
              return;
            }

            setDisplayText((prevText) => text.slice(0, reverseIndex));
            reverseIndex--;
          }, 100);
        }, 5000);
        return;
      }
      setDisplayText((prevText) => prevText + text[currentIndex]);
      currentIndex++;
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  return <h1 className={`typewriter ${isTyping ? "typing" : ""}`}>{displayText}</h1>;
};



export default Typewriter;