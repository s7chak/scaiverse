import { createContext, useState } from "react";
import Navbar from "../components/Navbar";
import AboutMe from "../components/sections/AboutMe";
import ContactForm from "../components/sections/ContactMe";
import Footer from "../components/sections/Footer";
import Introduction from "../components/sections/Introduction";
import Projects from "../components/sections/Projects";
import Publications from "../components/sections/Publications";
import ProgressBar from "../components/things/ProgressBar";

export const ThemeContext = createContext(null);

export const App = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <div className="app" id={theme}>
      <Navbar changeTheme={toggleTheme} />
      <ProgressBar />
      <Introduction />
      <Projects />
      <Publications />
      <AboutMe />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default App;
