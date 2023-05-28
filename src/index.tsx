import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// PAGES
import App from "./pages/App";

// CSS
import "bulma/css/bulma.css";
import "./styles/index.scss";
import Publications from "./pages/Publications";
import React from "react";

ReactDOM.render(
	<Router basename={process.env.PUBLIC_URL}>
		<Routes>
			<Route path="/publications" element={<Publications />} />
			<Route path="/" element={<App />}  />
		</Routes>
	</Router>,
	document.getElementById("root")
);
