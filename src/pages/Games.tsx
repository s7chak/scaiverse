import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import MyLogoBar from "../components/things/LogoNavBar";
import gameConfig from "../components/config/gameConfig.json";
import { useState } from "react";
import axios from "axios";
import CapitalQuizGame from "../components/games/CapitalGame";

export const Games = () => {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();
  const handlePlay = (gameName: string) => {
    navigate(`/games/${encodeURIComponent(gameName)}`);
  };

  return (
    <div id={theme} className="tools-page">
      <MyLogoBar />
      <div className="tools-header">
        <div className="scblogheader">
          <FadeInWhenVisible>
            <span className="general-header">Games</span>
          </FadeInWhenVisible>
        </div>
      </div>

      <div className="games-grid">
        {gameConfig.map((game) => (
          <div key={game.name} className="game-tile">
            <img src={game.image} alt={game.name} className="game-image" />
            <b>{game.name}</b>
            <p>{game.description}</p>
            <button
              className="game-play-btn"
              onClick={() => handlePlay(game.name)}
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

function FadeInWhenVisible({ children }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 29 }}
      transition={{ duration: 1.2 }}
    >
      {children}
    </motion.div>
  );
}

export const GameRunner = () => {
  const [theme, setTheme] = useState("dark");
  const { gameName } = useParams<{ gameName: string }>();
  const renderGame = () => {
    switch (gameName) {
      case "Capital Quiz":
        return <CapitalQuizGame />;
      default:
        return <p>Unknown game: {gameName}</p>;
    }
  };

  return (
    <div id={theme} className="game-runner">
      {renderGame()}
    </div>
  );
};

export default Games;
