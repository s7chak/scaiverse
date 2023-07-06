import React from "react";
import { Link } from "react-scroll";

export const Footer = () => {
	return (
		<footer id="footer" className="footer">
			<div className="content has-text-centered footertext">
				<span>
					{/* Copyright © 2023-2026 s7chak. All Rights Reserved. */}
					<Link smooth={true} to="introduction"><h3>Cheers!</h3></Link>
				</span>
			</div>
		</footer>
	);
};

export default Footer;
