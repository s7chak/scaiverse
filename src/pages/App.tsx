import Navbar from "../components/Navbar";
import Introduction from "../components/sections/Introduction";
import Projects from "../components/sections/Projects";
import AboutMe from "../components/sections/AboutMe";
import Footer from "../components/sections/Footer";
import Publications from "../components/sections/Publications";
import React from "react";

export const App = () => {
	return (
		<div className="app">
			<Navbar />
			<Introduction />
			<AboutMe />
			<Projects />
			<Publications />
			<Footer />
		</div>
	);
};

export default App;
