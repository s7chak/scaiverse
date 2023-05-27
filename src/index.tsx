import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// PAGES
import App from "./pages/App";

// CSS
import "bulma/css/bulma.css";
import "./styles/index.scss";
import Blogs from "./components/Blog";

ReactDOM.render(
	<Router>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/blogs" element={<Blogs />} />
		</Routes>
	</Router>,
	document.getElementById("root")
);