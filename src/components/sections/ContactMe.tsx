import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const emailEndpoint = 's7chak@gmail.com';

// 	const emailTo = 'your-email@example.com';
//     const emailContent = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
//     const emailUrl = `mailto:${emailTo}?subject=s7chak.github.io : New Email Received&body=${encodeURIComponent(emailContent)}`;
// 	window.open(emailUrl);

//     // Reset the form fields
//     setName('');
//     setEmail('');
//     setMessage('');
// 	setShowPopup(true);

//   };
const form = useRef();
const handleSubmit = (event) => {
	event.preventDefault();
	emailjs.sendForm('service_hkcxbx6', 'template_fz1wsou', '#messaging', 'YYQZE-GZHmh0jLEij')
      .then((result) => {
		  setShowPopup(true);
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
  let widthStack = isMobile?"90vw" : "50vw";
  return (
	<div className='form-parent' style={{width: widthStack}}>
		<br/><br/>
    <form id='messaging' onSubmit={handleSubmit}>
        <textarea
          id="message"
          name="message"
          className="contactmessage"
          placeholder=" Say what's on your mind."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{width: widthStack}}
        ></textarea>
	  <br/>
    <br/>
      <div className='divebox'><span className="dive" onClick={handleSubmit}>Leave a message</span></div>
	  <br/><br/><br/>
      {showPopup && (
        <>
        <EraseTyping className={'popup'} eraseTimeout={3.5}>Thank you for the message.</EraseTyping>
        <br/><br/>
          </>
      )}
    </form><br/><br/><br/>
	</div>
  );
};

const EraseTyping = ({ className, children, eraseTimeout }) => {
	const [text, setText] = useState("");
  
	useEffect(() => {
	  let currentIndex = 0;
	  let eraseTimer;
	  const typeTimeout = setInterval(() => {
		if (currentIndex < children.length) {
		  setText((prevText) => prevText + children[currentIndex]);
		  currentIndex++;
		} else {
		  clearInterval(typeTimeout);
		  if (eraseTimeout) {
			eraseTimer = setTimeout(() => {
			  eraseText();
			}, eraseTimeout * 1000);
		  }
		}
	  }, 100);
	  const eraseText = () => {
		clearInterval(eraseTimer);
		let eraseIndex = children.length - 1;
		const eraseTimeout = setInterval(() => {
		  if (eraseIndex >= 0) {
			setText((prevText) => prevText.slice(0, -1));
			eraseIndex--;
		  } else {
			clearInterval(eraseTimeout);
		  }
		}, 100);
	  };
  
	  return () => {
		clearInterval(typeTimeout);
		clearTimeout(eraseTimer);
	  };
	}, [children, eraseTimeout]);
  
	return <span className={className}>{text}</span>;
  };

export default ContactForm;