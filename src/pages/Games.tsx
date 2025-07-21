import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import gameConfig from "../components/config/gameConfig.json";
import CapitalQuizGame from "../components/games/CapitalGame";
import MyLogoBar from "../components/things/LogoNavBar";
import appConfig from "../components/config/appConfig.json";
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
      case "World Cap Quiz":
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

export interface GameResult {
  startedAt: number | null;
  endedAt: number | null;
  durationSeconds: number;
  won: boolean;
  lost: boolean;
  abandoned: boolean;
}

let envs = {
  local: "http://127.0.0.1:8091",
  prod: "https://gameapi-78191548528.us-west3.run.app",
};

let activeEnv = appConfig?.Games?.Env || "prod";

export const useGame = () => {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [endedAt, setEndedAt] = useState<number | null>(null);
  const [abandoned, setAbandoned] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const startGame = () => {
    setStartedAt(Date.now());
    setEndedAt(null);
    setWon(false);
    setLost(false);
    setAbandoned(false);
  };

  const endGame = ({
    didWin,
    didLose,
    didAbandon,
  }: {
    didWin?: boolean;
    didLose?: boolean;
    didAbandon?: boolean;
  }) => {
    const ended = Date.now();
    setEndedAt(ended);
    if (didWin) setWon(true);
    if (didLose) setLost(true);
    if (didAbandon) setAbandoned(true);

    return {
      startedAt,
      endedAt: ended,
      won: didWin || false,
      lost: didLose || false,
      abandoned: didAbandon || false,
      durationSeconds: startedAt ? Math.floor((ended - startedAt) / 1000) : 0,
    };
  };

  const durationSeconds =
    startedAt && endedAt ? Math.floor((endedAt - startedAt) / 1000) : 0;
  return {
    gameState: {
      startedAt,
      endedAt,
      durationSeconds,
      won,
      lost,
      abandoned,
    },
    startGame,
    endGame,
  };
};

export interface GameState {
  gameId: string;
  won?: boolean;
  lost?: boolean;
  abandoned?: boolean;
  durationSeconds: number;
  startedAt: number;
  endedAt: number;
}

export async function submitGameResult(gameState: GameState): Promise<void> {
  const payload = {
    game_id: gameState.gameId,
    result: gameState.won
      ? "won"
      : gameState.lost
      ? "lost"
      : gameState.abandoned
      ? "abandoned"
      : "unknown",
    duration: gameState.durationSeconds,
    started_at: gameState.startedAt,
    ended_at: gameState.endedAt,
  };

  try {
    const res = await fetch(`${envs[activeEnv]}/api/game_counter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update game metadata");
    console.log("Game result submitted!");
  } catch (err) {
    console.error("Failed to submit game result:", err);
  }
}

export default Games;
