import axios from "axios";
import { useEffect, useState } from "react";

let envs = {
  local: "http://127.0.0.1:8091",
  prod: "https://gameapi-78191548528.us-west3.run.app",
};
let activeEnv = "prod";

export const CapitalQuizGame = () => {
  const [theme, setTheme] = useState("dark");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [mode, setMode] = useState("mix");
  const [numQuestions, setNumQuestions] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${envs[activeEnv]}/api/quiz`, {
        params: {
          mode,
        },
      });
      setQuizData(res.data.questions);
      setStarted(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  if (!started) {
    return (
      <div id={theme} className="capital-quiz-welcome">
        <h2>Capital Quiz</h2>
        <p>Test your knowledge of world capitals, countries, and flags!</p>
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
            Number of Questions:
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

  return (
    <div className="capital-quiz-questions">
      <QuizScore score={score} total={quizData.length} />
      <QuizFlashCard
        question={quizData[currentIndex]}
        index={currentIndex}
        total={quizData.length}
        onNext={handleNext}
        onPrev={handlePrev}
        onAnswer={handleAnswer}
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
          Score: {score} / {total}
        </>
      ) : (
        <>Score: </>
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
}: {
  question: any;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onAnswer: (isCorrect: boolean) => void;
}) => {
  const [userInput, setUserInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(true);

  const handleSubmit = () => {
    const normalizedAnswer = userInput.trim().toLowerCase();
    const correctAnswers = Array.isArray(question.answer)
      ? question.answer.map((a: string) => a.trim().toLowerCase())
      : [String(question.answer).trim().toLowerCase()];
    const isCorrect = correctAnswers.includes(normalizedAnswer);
    setFeedback(isCorrect);
    onAnswer(isCorrect);
  };

  const handleOptionClick = (opt: string) => {
    setUserInput(opt);
    handleSubmit();
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
          {showFeedback ? "Hide Feedback" : "Show Feedback"}
        </button>
      </div>

      {showOptions && (
        <div className="quiz-options">
          {question.options.map((opt: string) => (
            <div
              key={opt}
              className="quiz-option-tile"
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}

      <div className="quiz-answer">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Your answer"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {feedback !== null && showFeedback && (
        <div className={`quiz-feedback ${feedback ? "correct" : "incorrect"}`}>
          {feedback ? "✅ Correct!" : "❌ Incorrect"}
        </div>
      )}

      <div className="quiz-navigation">
        <button onClick={onPrev} disabled={index === 0}>
          Previous
        </button>
        <button onClick={onNext} disabled={index === total - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CapitalQuizGame;
