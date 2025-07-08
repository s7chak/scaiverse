import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as SLink } from "react-scroll";
import McGuffin from "../things/Octahedron";

export const Introduction = () => {
  // const x = useMotionValue(0)
  // const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])
  const delays = [2, 3.5, 5.5, 6];
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;
  const [isDove, setDove] = useState(false);
  const [isGlow, setGlow] = useState(false);
  return (
    <div>
      <Playback />
      {/* <Playthree /> */}
      <section id="introduction" className="introduction section is-medium">
        <div className="introduction-container container">
          <div className="columns">
            <div className="column is-12">
              <br />
              <br />
              <br />
              <div className="content" style={{ textAlign: "center" }}>
                <FadeInWhenVisible>
                  <motion.div
                    // initial={{ opacity: 0, scale: 0.9}} animate={{ opacity: 1, scale: 1 }}
                    transition={{ ease: "linear", duration: delays[0] }}
                    whileHover={{ scale: 1.2, transition: { duration: 2 } }}
                    initial="hidden"
                    whileInView={{ scale: 1.05, transition: { duration: 2 } }}
                    viewport={{ once: false }}
                  >
                    <span
                      className={`general-header name-text  ${
                        isDove ? "name-text colormode" : ""
                      }`}
                      onClick={() => setDove(!isDove)}
                    >
                      This is my canvas
                    </span>
                  </motion.div>
                  <br />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span>
                      A repository of some of my side projects, their source
                      code, how they work, how they were built and the stories
                      behind them.
                    </span>
                  </motion.div>
                  <br />
                  <br />
                  <br />
                  <motion.div
                    style={{ display: "inline-flex", justifyContent: "center" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      ease: "linear",
                      duration: delays[3] - delays[2],
                      delay: delays[0],
                    }}
                    className="domain-container"
                  >
                    <SLink
                      to="projects"
                      smooth={true}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className={`nbutton is-domain ${
                          isMobile ? "is-burger" : ""
                        }`}
                      >
                        <p className="nbutton-text">Projects</p>
                      </div>
                    </SLink>
                    <SLink
                      to="blogging"
                      smooth={true}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className={`nbutton is-domain ${
                          isMobile ? "is-burger" : ""
                        }`}
                      >
                        <p className="nbutton-text">Blogs</p>
                      </div>
                    </SLink>
                    <Link to="/tools" style={{ textDecoration: "none" }}>
                      <div
                        className={`nbutton is-domain ${
                          isMobile ? "is-burger" : ""
                        }`}
                      >
                        <p className="nbutton-text">Tools</p>
                      </div>
                    </Link>
                    <Link to="/resources" style={{ textDecoration: "none" }}>
                      <div
                        className={`nbutton is-domain ${
                          isMobile ? "is-burger" : ""
                        }`}
                      >
                        <p className="nbutton-text">Resources</p>
                      </div>
                    </Link>
                    {/* <Link to="/fin" style={{ textDecoration: "none" }}>
                      <div
                        className={`nbutton is-domain ${
                          isMobile ? "is-burger" : ""
                        }`}
                      >
                        <p className="nbutton-text">Finance</p>
                      </div>
                    </Link> */}
                    <Link to="/fin" style={{ textDecoration: "none" }}>
                      <div
                        className={`nbutton is-domain ${
                          isMobile ? "is-burger" : ""
                        }`}
                      >
                        <p className="nbutton-text">Fin</p>
                      </div>
                    </Link>
                  </motion.div>
                </FadeInWhenVisible>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function multiply(no: number) {
  console.log(no.toString());
  return (
    <motion.div
      className="miniball"
      animate={{ opacity: 1, x: 0, y: 0, "--rotate": "60deg" } as any}
      transition={{ ease: "linear", duration: 4, delay: 1 }}
    ></motion.div>
  );
}

const EraseTyping = ({
  className,
  children,
  eraseTimeout = 2,
  eraseTill = 0,
}) => {
  const [text, setText] = React.useState("");
  const str = typeof children === "string" ? children : String(children);

  React.useEffect(() => {
    let index = 0;
    let interval: NodeJS.Timeout;
    let eraseTimer: NodeJS.Timeout;

    const typeNext = () => {
      interval = setInterval(() => {
        if (index < str.length) {
          setText((prev) => prev + str[index]);
          index++;
        } else {
          clearInterval(interval);
          if (eraseTimeout != null) {
            eraseTimer = setTimeout(() => eraseText(), eraseTimeout * 1000);
          }
        }
      }, 150);
    };

    const eraseText = () => {
      let eraseIndex = str.length;
      interval = setInterval(() => {
        if (eraseIndex > eraseTill) {
          setText((prev) => prev.slice(0, -1));
          eraseIndex--;
        } else {
          clearInterval(interval);
        }
      }, 100);
    };
    setText("");
    typeNext();
    return () => {
      clearInterval(interval);
      clearTimeout(eraseTimer);
    };
  }, [str, eraseTimeout, eraseTill]);

  return <span className={className}>{text}</span>;
};

function FadeInWhenVisible({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 2 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 1 },
      }}
    >
      {children}
    </motion.div>
  );
}

function Playback() {
  const [isActive, setIsActive] = React.useState(false);
  const mountainCount = 24;
  // const mountains = Array.from({ length: mountainCount }, (_, index) => (
  // 	<div key={index} className="mountain" />
  // ));
  // const [showDefinition, setShow] = useState(false);
  const [isWelcome, setIsWelcome] = useState(false);
  const [isDove, setDove] = useState(false);
  const miniTransition = { duration: 9, yoyo: Infinity, ease: "easeInOut" };
  var date = new Date();
  const percentDay = ((date.getHours() * 100) / 24).toString();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;
  let widthDive = isMobile ? "80vw" : "auto";
  const hwrldText = "Hello world!";
  return (
    <section className="playback" id="play_home">
      {/* <div className="play-container">
			{mountains}
		</div> */}
      <div className="mcguffin-container">
        <McGuffin />
      </div>
      <br />
      <div className="play-intro-container">
        <div className="typewriter-container">
          {/* <EraseTyping className="typewriter" eraseTimeout={2} eraseTill={5}>
            123456
          </EraseTyping> */}
          <div className="typewritten">
            <span className="typewritten-text">Hello World!</span>
            <div className="blinking-cursor"></div>
          </div>
          {/* <motion.div
            className="typewriter-cursor"
            onMouseEnter={() => setDove(true)}
          ></motion.div> */}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.9, y: 40 }}
          transition={{ ease: "linear", duration: 1.5, delay: 4 }}
          className="sc-header-container"
        >
          <span className="header">
            I am{" "}
            <span
              className={`name-text  ${isDove ? "name-text colormode" : ""}`}
              onClick={() => setDove(!isDove)}
            >
              Subhayu
            </span>
          </span>
        </motion.div>
        <br />
        <br />
        <IntroText />
        <br />
        <>
          <br />
        </>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 2, delay: 6 }}
          >
            <div className={`nbutton ${isMobile ? "is-burger" : ""}`}>
              <SLink
                to="introduction"
                smooth={true}
                onClick={() => setDove(true)}
              >
                <span className="nbutton-text">Explore</span>
              </SLink>
            </div>
          </motion.div>
        </div>

        {/* Glow for Let's dive in */}
        {/* {isDove ? (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "linear", duration: 1 }}
          >
            <GlowBall />
          </motion.div>
        ) : null} */}

        {/* <motion.div 
				initial={{ opacity: 0, x:0, y: 0, offsetDistance: "0%" }}
        		animate={{ opacity: 1, offsetDistance: percentDay+"%"}}
				transition={transition}
				drag
				dragConstraints={{top: -50,left: -50,right: 50,bottom: 50,}}
				className="ball"
				onClick={() => setDove(true)}
			/> */}
      </div>
      {/* <div>{ showDefinition ? 
		<motion.div
				initial={{ opacity: 0, offsetDistance: "0%" }}
        		animate={{ offsetDistance: "100%", opacity: 0.9}}
				transition={miniTransition}
				drag
				dragConstraints={{top: -50,left: -50,right: 50,bottom: 50,}}
				className="miniball"/> : null}</div>
		<div>
			{ showDefinition ? <MyDefinition /> : null }
		</div> */}
    </section>
  );
}

const OnlyTyping = ({ className, children }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const timeout = setInterval(() => {
      if (currentIndex < children.length) {
        setText((prevText) => prevText + children[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(timeout);
      }
    }, 100);

    return () => clearInterval(timeout);
  }, [children]);

  return <span className={className}>{text}</span>;
};

function IntroText() {
  const roles = [
    "technologist",
    "developer",
    "engineer",
    "problem solver",
    "lifelong learner",
    "designer",
    "coder",
    "artist",
    "clarity curator",
    "system sculptor",
  ];
  const vowelRegex = "^[aieouAIEOU].*";
  const [newName, setnewName] = useState("");
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * roles.length);
    let prefix = roles[index].match(vowelRegex) ? "An" : "A";
    setnewName(prefix + " " + roles[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 4000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <FadeInWhenVisible>
      <motion.div
        className="introtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
      >
        <motion.span className={"acc-text"}>{newName}</motion.span> at the nexus
        of software, machine learning and finance making sense of the dataverse
        one line of code at a time.
      </motion.div>
    </FadeInWhenVisible>
  );
}

function MyDefinition() {
  const roles = [
    "developer",
    "engineer",
    "problem solver",
    "designer",
    "coder",
    "artist",
  ];
  const vowelRegex = "^[aieouAIEOU].*";
  const [newName, setnewName] = useState("");
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * roles.length);
    let prefix = roles[index].match(vowelRegex) ? "an" : "a";
    setnewName(prefix + " " + roles[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 3000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <FadeInWhenVisible>
      <motion.div
        initial={{ y: 240 }}
        transition={{ ease: "linear", duration: 2 }}
      >
        <div className="definitions">
          I am <span className="blue-text">{newName}</span>
        </div>
      </motion.div>
    </FadeInWhenVisible>
  );
}

export default Introduction;
