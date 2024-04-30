import React from "react";
import { Link } from "react-scroll";

export const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <Link smooth={true} to="introduction" duration={3500}>
        <span className="general-header">Cheers!</span>
      </Link>
      <br />
      <br />
      <span className="footertext">
        Made with React JS, Fiber, Three, DREI, Framer Motion, HTML5, SCSS.
        <br />
        Copyright © S C.
        <p>All Rights Reserved.</p>
      </span>
    </footer>
  );
};

export default Footer;
