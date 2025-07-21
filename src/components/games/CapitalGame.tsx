import axios from "axios";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import gameConfig from "../config/gameConfig.json";
import { submitGameResult, useGame } from "../../pages/Games";
import appConfig from "../config/appConfig.json";

let envs = {
  local: "http://127.0.0.1:8091",
  prod: "https://gameapi-78191548528.us-west3.run.app",
};
let activeEnv = appConfig?.Games?.Env || "prod";

export const CapitalQuizGame = () => {
  const { gameState, startGame, endGame } = useGame();
  const [resultSubmitted, setResultSubmitted] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [mode, setMode] = useState("mix");
  const [numQuestions, setNumQuestions] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [index: number]: string }>(
    {}
  );
  const thisGame = gameConfig.find((game) => game.id === "CapQuiz");
  const desc =
    thisGame?.description || "Test your knowledge of world capitals and flags.";
  const gameName = thisGame?.name || "Capital Quiz";
  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${envs[activeEnv]}/api/${thisGame?.id.toLowerCase()}`,
        {
          params: {
            mode,
            numQuestions,
          },
        }
      );
      setQuizData(res.data.questions);
      setStarted(true);
      startGame();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex >= quizData.length - 1) {
      setShowResults(true);

      if (!resultSubmitted || true) {
        let finalState;
        if (score >= quizData.length * 0.8) {
          finalState = endGame({ didWin: true });
        } else {
          finalState = endGame({ didLose: true });
        }

        submitGameResult({
          gameId: "CapQuiz",
          ...finalState,
        });

        setResultSubmitted(true);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswer = (index: number, answer: string, isCorrect: boolean) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [index]: answer };
      const correctCount = Object.entries(updated).reduce((acc, [i, ans]) => {
        const q = quizData[Number(i)];
        const correctAnswers = Array.isArray(q.answer)
          ? q.answer.map((a: string) => a.trim().toLowerCase())
          : [String(q.answer).trim().toLowerCase()];
        if (correctAnswers.includes(ans.trim().toLowerCase())) {
          return acc + 1;
        }
        return acc;
      }, 0);

      setScore(correctCount);

      return updated;
    });
  };

  if (!started) {
    return (
      <div id={theme} className="capital-quiz-welcome">
        <h2>{gameName}</h2>
        <p>{desc}</p>
        <div className="quiz-settings">
          <label>
            Mode:
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="country">Country → Capital</option>
              <option value="capital">Capital → Country</option>
              <option value="flag">Identify Flag</option>
              <option value="mix">Mix</option>
            </select>
          </label>
          <label>
            Questions:
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
        <button onClick={handleStart} disabled={loading}>
          {loading ? "Loading…" : "Start Quiz"}
        </button>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizWin
        score={score}
        total={quizData.length}
        onBack={() => {
          setShowResults(false);
          setIsReviewMode(true);
        }}
      />
    );
  }

  return (
    <div className="capital-quiz-questions">
      <QuizScore score={score} total={quizData.length} />
      <QuizFlashCard
        question={quizData[currentIndex]}
        index={currentIndex}
        total={quizData.length}
        onNext={handleNext}
        onPrev={handlePrev}
        onAnswer={(idx, ans, correct) => {
          if (!showResults) handleAnswer(idx, ans, correct);
        }}
        isReviewMode={isReviewMode}
        savedAnswer={userAnswers[currentIndex] || ""}
      />
    </div>
  );
};

export const QuizScore = ({
  score,
  total,
}: {
  score: number;
  total: number;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="capital-quiz-score"
      onClick={() => setVisible(!visible)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      {visible ? (
        <>
          Live Score: {score} / {total}
        </>
      ) : (
        <>Live Score: </>
      )}
    </span>
  );
};

export const QuizFlashCard = ({
  question,
  index,
  total,
  onNext,
  onPrev,
  onAnswer,
  isReviewMode,
  savedAnswer,
}: {
  question: any;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onAnswer?: (index: number, answer: string, isCorrect: boolean) => void;
  isReviewMode: boolean;
  savedAnswer: string;
}) => {
  const [userInput, setUserInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [feedback, setFeedback] = useState<null | boolean>(
    question.feedback ?? null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = (inputOverride?: string) => {
    if (isReviewMode || !onAnswer) return;
    const answerToCheck = (inputOverride ?? userInput).trim().toLowerCase();
    const correctAnswers = Array.isArray(question.answer)
      ? question.answer.map((a: string) => a.trim().toLowerCase())
      : [String(question.answer).trim().toLowerCase()];

    const isCorrect = correctAnswers.includes(answerToCheck);
    setFeedback(isCorrect);
    setShowFeedback(false);
    onAnswer?.(index, inputOverride ?? userInput, isCorrect);
    question.userInput = inputOverride ?? userInput;
    question.feedback = isCorrect;
  };

  const handleOptionClick = (opt: string) => {
    if (isReviewMode) return;
    setUserInput(opt);
    handleSubmit(opt);
  };

  useEffect(() => {
    setUserInput("");
    setFeedback(null);
    setShowFeedback(false);
  }, [index]);
  return (
    <div className="quiz-flashcard">
      <div className="quiz-header">
        <span>
          Question {index + 1} of {total}
        </span>
      </div>

      <div className="quiz-card">
        <h3>{question.question}</h3>
        {question.flag && (
          <img src={question.flag} alt="flag" className="quiz-flag" />
        )}
      </div>

      <div className="quiz-actions">
        <button onClick={() => setShowOptions(!showOptions)}>
          {showOptions ? "Hide Options" : "Show Options"}
        </button>
        <button
          style={{ marginLeft: "0.5rem" }}
          onClick={() => setShowFeedback(!showFeedback)}
        >
          {showFeedback ? "Hide Answer" : "Show Answer"}
        </button>
      </div>

      {showOptions && (
        <div className="quiz-options">
          {question.options.map((opt: string) => (
            <div
              key={opt}
              className={`quiz-option-tile ${
                userInput === opt || savedAnswer === opt ? "selected" : ""
              }`}
              onClick={() => !isReviewMode && handleOptionClick(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}

      <div className="quiz-answer">
        <input
          type="text"
          value={userInput || savedAnswer}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Your answer"
          readOnly={isReviewMode}
        />
        {!showOptions && (
          <button onClick={() => handleSubmit(userInput)}>Submit</button>
        )}
      </div>

      {feedback !== null && showFeedback && (
        <div className={`quiz-feedback ${feedback ? "correct" : "incorrect"}`}>
          {feedback ? "✅ Correct!" : "❌ Incorrect"}
        </div>
      )}

      <div className="quiz-navigation">
        <button onClick={onPrev} disabled={index === 0}>
          Back
        </button>
        {index === total - 1 ? (
          <button onClick={onNext}>Results</button>
        ) : (
          <button onClick={onNext} disabled={index >= total - 1}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export const QuizWin = ({
  score,
  total,
  onBack,
}: {
  score: number;
  total: number;
  onBack: () => void;
}) => {
  const percentage = (score / total) * 100;
  const isWinner = percentage >= 80;
  const { width, height } = useWindowSize();

  return (
    <div className="quiz-win">
      {isWinner && <Confetti width={width} height={height} />}

      <h2>The Results Are In!</h2>
      <p>
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>

      {isWinner ? (
        <p className="celebration">🎉 Amazing! You know your geography!</p>
      ) : (
        <p className="try-again">👍 Great job!</p>
      )}

      <button onClick={onBack} className="quiz-back-btn">
        Review Questions
      </button>
    </div>
  );
};

export default CapitalQuizGame;
