import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// PAGES
import App from "./pages/App";

// CSS
import "bulma/css/bulma.css";
import "./styles/index.scss";
import "./styles/_animations.scss";
import React from "react";
import { motion } from "framer-motion";
import Blogger from "./pages/Blogger";
import { SCBlogPosting } from "./components/SCBlogPosting";
import Recoms from "./pages/Recoms";
import Finance from "./pages/Finance";
let env = process.env.NODE_ENV;
let baseURL = process.env.PUBLIC_URL;
console.log(env);

ReactDOM.render(
  <Router basename={baseURL}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blogs" element={<Blogger />}></Route>
      <Route path="/blogs/:id" element={<SCBlogPosting />}></Route>
      <Route path="/recoms" element={<Recoms />}></Route>
      <Route path="/finance" element={<Finance />}></Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

function NoMatch() {
  const [isActive, setIsActive] = React.useState(false);
  const mountainCount = 19;
  const mountains = Array.from({ length: mountainCount }, (_, index) => (
    <div key={index} className="mountain" />
  ));
  console.log(mountains.length.toString());
  return (
    <div className="nomatch">
      <nav className="navbar is-fixed-top"></nav>
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 900 }}
        animate={{ opacity: 0.9, scale: 1, y: 700 }}
        transition={{ ease: "linear", duration: 5 }}
      >
        <h2>Hello!</h2>
      </motion.div>
      <div className="play-container">{mountains}</div>
      <br />
      <br />
      <br />
      <br />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -1100 }}
        animate={{ opacity: 0.9, scale: 1, y: -800 }}
        transition={{ ease: "linear", duration: 5 }}
      >
        <p>
          <Link to="/">Way to my canvas...</Link>
        </p>
      </motion.div>
    </div>
  );
}
