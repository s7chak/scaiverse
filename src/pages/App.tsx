import Navbar from "../components/Navbar";
import Introduction from "../components/sections/Introduction";
import Projects from "../components/sections/Projects";
import AboutMe from "../components/sections/AboutMe";
import Footer from "../components/sections/Footer";
import Publications from "../components/sections/Publications";
import React, { createContext, useState } from "react";
import ReactSwitch from "react-switch";
import Sphere3d from "../components/things/3dPlay";
import ContactForm from "../components/sections/ContactMe";

export const ThemeContext = createContext(null);

export const App = () => {
	const [theme, setTheme] = useState("dark");
	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"));
	}
	return (
		<div className="app" id={theme}>
			<Navbar changeTheme={toggleTheme}/>
			<br/><br/><br/><br/>
			<Introduction />
			<AboutMe />
			<Projects />
			<Publications />
			<ContactForm />
			<Footer />
		</div>
	);
};

export default App;
