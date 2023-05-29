import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// PAGES
import App from "./pages/App";

// CSS
import "bulma/css/bulma.css";
import "./styles/index.scss";
import Publications from "./components/sections/Publications";
import React from "react";

let env = process.env.NODE_ENV
let baseURL = process.env.PUBLIC_URL;

console.log(env);
console.log(baseURL?.toString());

ReactDOM.render(
	<Router basename={baseURL}>
		<Routes>
			<Route path="/" element={<App />}  />
			<Route path="*" element={<NoMatch />} />
		</Routes>
	</Router>,
	document.getElementById("root")
);

function NoMatch() {
	return (
	  <div className="app">
		<h2>Nothing to see here!</h2>
		<p>
		  <Link to="/">Go to the home page</Link>
		</p>
	  </div>
	);
  }