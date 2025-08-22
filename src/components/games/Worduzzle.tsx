import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useGame } from "../../pages/Games";
import appConfig from "../config/appConfig.json";
import gameConfig from "../config/gameConfig.json";

let envs = {
  local: "http://127.0.0.1:8091",
  prod: "https://gameapi-78191548528.us-west3.run.app",
};
let activeEnv = appConfig?.Games?.Env || "prod";

export const WorduzzleGame = () => {
  const { startGame } = useGame();
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const thisGame = gameConfig.find((g) => g.id === "Worduzzle");
  const desc = thisGame?.description || "Solve the Word Puzzle!";
  const gameName = thisGame?.name || "Worduzzle";
  type Cell = {
    letter: string;
    status: "correct" | "present" | "absent" | "empty";
  };

  const [gridData, setGridData] = useState<any>();

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${envs[activeEnv]}/api/worduzzle`, {
        params: { difficulty: "default" },
      });
      setGridData(res.data);
      setStarted(true);
      startGame();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  if (!started) {
    return (
      <div id={theme} className="worduzzle-welcome">
        <h2>{gameName}</h2>
        <p>{desc}</p>
        <button onClick={handleStart} disabled={loading}>
          {loading ? "Loading…" : "Start Game"}
        </button>
      </div>
    );
  }
  const grid = gridData?.grid;
  const tableGrid = buildWorduzzleGrid(grid);
  console.log(grid);
  return (
    <WorduzzleBoard correctWords={gridData?.words} gridLayout={tableGrid} />
  );
};

type PlacedCell = {
  row: number;
  col: number;
  letter: string;
  readonly: boolean;
};

function buildWorduzzleGrid(
  gridFromPython: (string | null)[][]
): (PlacedCell | null)[][] {
  const finalGrid: (PlacedCell | null)[][] = [];

  for (let r = 0; r < gridFromPython.length; r++) {
    const row: (PlacedCell | null)[] = [];

    for (let c = 0; c < gridFromPython[r].length; c++) {
      const letter = gridFromPython[r][c];
      if (letter === null) {
        row.push(null); // This is now valid
      } else {
        row.push({
          row: r,
          col: c,
          letter: letter,
          readonly: true,
        });
      }
    }

    finalGrid.push(row);
  }

  return finalGrid;
}

type Cell = {
  letter: string;
  status: "empty" | "correct" | "present" | "absent";
  isActive: boolean;
};

type WorduzzleBoardProps = {
  correctWords: string[];
  gridLayout: (PlacedCell | null)[][];
};

export const WorduzzleBoard = ({
  correctWords,
  gridLayout,
}: WorduzzleBoardProps) => {
  const [gridData, setGridData] = useState<Cell[][]>(
    gridLayout.map((row) =>
      row.map((val) => ({
        letter: "",
        status: "empty",
        isActive: val !== null,
      }))
    )
  );

  const [selected, setSelected] = useState<{ row: number; col: number } | null>(
    null
  );

  const handleCellClick = (row: number, col: number) => {
    if (gridData[row][col].isActive) setSelected({ row, col });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selected) return;
    const { row, col } = selected;

    if (/^[a-zA-Z]$/.test(e.key)) {
      const letter = e.key.toUpperCase();
      setGridData((prev) =>
        prev.map((r, rIdx) =>
          r.map((c, cIdx) =>
            rIdx === row && cIdx === col ? { ...c, letter } : c
          )
        )
      );
    }

    if (e.key === "ArrowRight") {
      const grid = gridData;
      const moveRight = col + 1 < grid[0].length && grid[row][col + 1];
      if (moveRight) {
        setSelected({ row, col: col + 1 });
      } else {
        for (let r = row + 1; r < grid.length; r++) {
          for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c]) {
              setSelected({ row: r, col: c });
              return;
            }
          }
        }
      }
    }
  };

  const handleSubmit = () => {
    const correctSet = new Set(correctWords.join("").split(""));
    const updated = gridData.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (!cell.isActive || cell.letter === "") return cell;
        let correct = gridLayout[rIdx][cIdx];
        let status: Cell["status"] = "absent";
        if (cell.letter === correct?.letter) status = "correct";
        else if (correctSet.has(cell.letter)) status = "present";
        return { ...cell, status };
      })
    );
    setGridData(updated);
  };

  return (
    <>
      <div className="worduzzle-board" tabIndex={0} onKeyDown={handleKeyDown}>
        {gridData.map((row, rowIndex) => (
          <div className="worduzzle-row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                onClick={() =>
                  cell ? handleCellClick(rowIndex, cellIndex) : undefined
                }
                className={`worduzzle-cell ${
                  cell
                    ? `${cell.status} ${
                        selected?.row === rowIndex &&
                        selected?.col === cellIndex
                          ? "selected"
                          : ""
                      }`
                    : "empty"
                }`}
              >
                {cell?.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default WorduzzleGame;
