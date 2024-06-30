import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/sections/Footer";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { SCBlogCard, SCBlogPost } from "../components/SCBlogCard";
import myBlogConfigData from "../components/config/scaiBlogConfig.json";
import axios from "axios";

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
let envs = {
  local: "http://127.0.0.1:8091",
  prod: "https://recomapi-auoic2h3pa-uc.a.run.app",
};
let activeEnv = "prod";

interface Paper {
  Title: string;
  Link: string;
  People: string;
  Date: string;
  Summary: string;
  Props: string;
}

interface Book {
  Title: string;
  People: string;
  Date: string;
  Summary: string;
  Rating: number;
  Props: string;
}

export const Recoms = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;
  const [totalCount, setTotalCount] = useState(0);
  const [type, setType] = useState("books");
  const [keywords, setKeywords] = useState("");
  const [people, setPeople] = useState("");
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [respapers, setPapers] = useState<Paper[]>([]);
  const [cpaper, setCountPaper] = useState<number>(0);
  const [newList, setNewList] = useState<Book[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedPaperIndex, setExpandedPaperIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPeople, setNewPeople] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newProps, setNewProps] = useState("{'NumReviews':1}");
  const [doubleClickIndex, setDoubleClickIndex] = useState(null);

  const handleDelete = async (index) => {
    try {
      setLoading(true);
      const bookToDelete = recommendations[index];
      const response = await axios.post(`${envs[activeEnv]}/delete`, {
        book: bookToDelete,
      });
      if (response.data.message === "Book deleted successfully") {
        const updatedRecommendations = recommendations.filter(
          (_, i) => i !== index
        );
        setRecommendations(updatedRecommendations);
      }
      setSaveStatus(response.data.message);
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaperClick = (index) => {
    if (doubleClickIndex === index) {
      setDoubleClickIndex(null);
      setExpandedPaperIndex(index);
    } else {
      setDoubleClickIndex(index);
    }
  };

  const handleDoubleClick = (index) => {
    if (doubleClickIndex === index) {
      handleDelete(index);
      setDoubleClickIndex(null);
    } else {
      setDoubleClickIndex(index);
    }
  };

  const handleAddRecommendation = () => {
    setNewList((prevList) => [
      ...prevList,
      { Title: "", People: "", Date: "", Rating: 0, Props: "", Summary: "" },
    ]);
    setAddMode(true);
  };
  const handleInputChange = (
    index: number,
    field: keyof Book,
    value: string
  ) => {
    const updatedList = newList.map((rec, i) =>
      i === index ? { ...rec, [field]: value } : rec
    );
    setNewList(updatedList);
  };

  const handleSaveBooks = async () => {
    try {
      setLoading(true);

      // Check if new book details are provided
      const isNewBookProvided =
        newTitle.trim() &&
        newPeople.trim() &&
        newSummary.trim() &&
        newRating.trim();

      // Create a new book entry if details are provided
      const newBook = isNewBookProvided
        ? [
            {
              Title: newTitle,
              People: newPeople,
              Date: newDate,
              Summary: newSummary,
              Rating: parseFloat(newRating),
              Props: newProps,
            },
          ]
        : [];

      // Determine the list of books to save
      const booksToSave =
        newList.length > 0
          ? newList
          : newBook.length > 0
          ? newBook
          : recommendations;

      const response = await axios.post(`${envs[activeEnv]}/savebooks`, {
        books: booksToSave,
      });

      let status = response.data.message;
      setSaveStatus(status);
    } catch (error) {
      console.error("Error saving books:", error);
    } finally {
      setLoading(false);
    }
  };

  const setCurSummary = (index, newSummary) => {
    setRecommendations((prevRecommendations) =>
      prevRecommendations.map((rec, i) =>
        i === index ? { ...rec, Summary: newSummary } : rec
      )
    );
  };

  const setCurTitle = (index, newTitle) => {
    setRecommendations((prevRecommendations) =>
      prevRecommendations.map((rec, i) =>
        i === index ? { ...rec, Title: newTitle } : rec
      )
    );
  };
  const setCurDate = (index, newDate) => {
    setRecommendations((prevRecommendations) =>
      prevRecommendations.map((rec, i) =>
        i === index ? { ...rec, Date: newDate } : rec
      )
    );
  };
  const setCurPeople = (index, newPeople) => {
    setRecommendations((prevRecommendations) =>
      prevRecommendations.map((rec, i) =>
        i === index ? { ...rec, People: newPeople } : rec
      )
    );
  };
  const setCurProps = (index, newProps) => {
    setRecommendations((prevRecommendations) =>
      prevRecommendations.map((rec, i) =>
        i === index ? { ...rec, Props: newProps } : rec
      )
    );
  };
  const setCurRating = (index, newProps) => {
    setRecommendations((prevRecommendations) =>
      prevRecommendations.map((rec, i) =>
        i === index ? { ...rec, Rating: newProps } : rec
      )
    );
  };

  const totalCountFetch = async () => {
    try {
      const response = await axios.get(envs[activeEnv] + `/totalbooks`, {
        params: {},
      });
      setTotalCount(response.data);
    } catch (error) {
      console.error("Error fetching count of books:", error);
    }
  };
  const reloadBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(envs[activeEnv] + `/reload`, {
        params: {},
      });
      setTotalCount(response.data.count);
      setSearchDone(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching count of books:", error);
    }
  };
  const toggleExpandPaper = (index) => {
    if (index != expandedPaperIndex)
      setExpandedPaperIndex(expandedPaperIndex === index ? null : index); // Toggle expanded state
  };

  const toggleExpand = (index) => {
    if (index != expandedIndex)
      setExpandedIndex(expandedIndex === index ? null : index); // Toggle expanded state
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      setSaveStatus("");
      setExpandedIndex(null);
      const response = await axios.get(envs[activeEnv] + `/search`, {
        params: {
          type: type,
          keywords: keywords,
          people: people,
        },
      });
      if (type == "books") {
        setRecommendations(response.data);
      }
      if (type == "papers") {
        let res = response.data;
        setPapers(res["papers"]);
        setCountPaper(res["count"]);
      }

      setSearchDone(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearAddFields = () => {
    setNewTitle("");
    setNewPeople("");
    setNewRating("");
    setNewSummary("");
    setNewDate("");
    setSaveStatus("");
    setRecommendations([]);
    setNewList([]);
  };
  if (type === "books") {
    totalCountFetch();
  }

  return (
    <div id={theme} className="scblogging is-medium">
      <div className="scblogheader">
        <FadeInWhenVisible>
          <span className="general-header">Recoms</span>
        </FadeInWhenVisible>
        <br />
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "linear", duration: 2.5 }}
        >
          <span className={`scblogheadertagline ${isMobile ? "mobile" : ""}`}>
            What's your next book?
          </span>
          <br />
        </motion.div>
        {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 3 }}
          >
            <Link to={"/"}>
              <div className="gbutton scblogbutton">Scaiverse</div>
            </Link>
          </motion.div> */}
      </div>

      <div className="recompanel">
        <select
          className="recomselect"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="books">Books</option>
          <option value="papers">Papers</option>
          <option value="movies" disabled>
            Movies
          </option>
          <option value="tvshows" disabled>
            TV Shows
          </option>
        </select>
        <div className="recomsearchpanel">
          <input
            type="text"
            placeholder="Enter keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="recominput"
          />
          <input
            type="text"
            placeholder="Enter author/people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="recominput"
          />
        </div>
        <div className="recombuttonpanel">
          <div>
            <button className="gbutton recombutton" onClick={handleSearch}>
              Search
            </button>
          </div>
          {activeEnv == "local" ? (
            <div>
              <button className="gbutton recombutton" onClick={handleSaveBooks}>
                Save
              </button>
              <button
                className="gbutton recombutton"
                onClick={handleAddRecommendation}
              >
                Add
              </button>
              <button className="gbutton recombutton" onClick={clearAddFields}>
                Clear
              </button>
              <button className="gbutton recombutton" onClick={reloadBooks}>
                Reload
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        className="recom-count"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        {totalCount > 0 && <h2>Total Books: {totalCount}</h2>}
        {saveStatus != "" && (
          <div
            className="recom-count"
            style={{ textAlign: "center", margin: "20px 0" }}
          >
            {<h2>{saveStatus}</h2>}
          </div>
        )}
      </div>

      <div
        className="recom-count"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        {recommendations.length > 0 && <h2>Books: {recommendations.length}</h2>}
      </div>
      {type == "papers" && !!respapers && (
        <div
          className="recom-count"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          {respapers.length > 0 && <h2>Papers: {respapers.length}</h2>}
          {cpaper && <h2>{cpaper}</h2>}
        </div>
      )}

      {type == "papers" &&
        respapers.map((rec, index) => (
          <div
            key={index}
            className="recom-card"
            onClick={() => toggleExpand(index)}
          >
            <h3>{rec["Title"]}</h3>
            <h4>{rec["Link"]}</h4>
            <button
              className="gbutton recombutton"
              onClick={() => handlePaperClick(index)}
            >
              {doubleClickIndex === index ? "Check Paper" : "DoubleClick"}
            </button>
            {expandedIndex === index && (
              <div className="recomdescfield">
                <textarea
                  id="desc"
                  name="desc"
                  className="recomdesctext"
                  placeholder="Summary"
                  value={rec.Summary}
                  onChange={(e) => setCurSummary(index, e.target.value)}
                  style={{ width: "100%", height: "100%" }}
                ></textarea>
              </div>
            )}
          </div>
        ))}

      {newList.map((rec, index) => (
        <div className="recom-card" key={index} style={{ marginTop: "5em" }}>
          <input
            type="text"
            placeholder="Title"
            value={rec.Title}
            onChange={(e) => handleInputChange(index, "Title", e.target.value)}
            className="recomchangeinput"
          />
          <input
            type="text"
            placeholder="Author"
            value={rec.People}
            onChange={(e) => handleInputChange(index, "People", e.target.value)}
            className="recomchangeinput"
          />
          <input
            type="text"
            placeholder="Publish Date"
            value={rec.Date}
            onChange={(e) => handleInputChange(index, "Date", e.target.value)}
            className="recomchangeinput"
          />
          <input
            type="text"
            placeholder="Rating"
            value={rec.Rating}
            onChange={(e) => handleInputChange(index, "Rating", e.target.value)}
            className="recomchangeinput"
          />
          <textarea
            id="props"
            name="props"
            className="recomdesctext"
            placeholder="Props dictionary"
            value={rec.Props}
            onChange={(e) => handleInputChange(index, "Props", e.target.value)}
            style={{ width: "100%", height: "50%" }}
          ></textarea>
          <textarea
            id="desc"
            name="desc"
            className="recomdesctext"
            placeholder="Summary"
            value={rec.Summary}
            onChange={(e) =>
              handleInputChange(index, "Summary", e.target.value)
            }
            style={{ width: "100%", height: "150%" }}
          ></textarea>
        </div>
      ))}

      {type == "books" && (
        <div className="recompanel">
          {loading ? (
            <div className="recom-count">...Loading...</div>
          ) : recommendations.length > 0 ? (
            activeEnv == "local" ? (
              // local view
              recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="recom-card"
                  onClick={() => toggleExpand(index)}
                >
                  <input
                    type="text"
                    placeholder="Title"
                    value={rec.Title}
                    onChange={(e) => setCurTitle(index, e.target.value)}
                    className="recomchangeinput"
                  />
                  <input
                    type="text"
                    value={rec.People}
                    placeholder="Author"
                    onChange={(e) => setCurPeople(index, e.target.value)}
                    className="recomchangeinput"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={rec.Date}
                    onChange={(e) => setCurDate(index, e.target.value)}
                    className="recomchangeinput"
                  />
                  <button
                    className="gbutton recombutton"
                    onClick={() => handleDoubleClick(index)}
                  >
                    {doubleClickIndex === index ? "Confirm Delete" : "Delete"}
                  </button>
                  {expandedIndex === index && (
                    <div className="recomdescfield">
                      <textarea
                        id="desc"
                        name="desc"
                        className="recomdesctext"
                        placeholder="Summary"
                        value={rec.Summary}
                        onChange={(e) => setCurSummary(index, e.target.value)}
                        style={{ width: "100%", height: "100%" }}
                      ></textarea>
                      <input
                        type="text"
                        placeholder="Rating"
                        value={rec.Rating}
                        onChange={(e) => setCurRating(index, e.target.value)}
                        className="recomchangeinput"
                      />
                      <input
                        type="text"
                        placeholder="Props.--"
                        value={rec.Props}
                        onChange={(e) => setCurProps(index, e.target.value)}
                        className="recomchangeinput"
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="recom-card"
                  onClick={() => toggleExpand(index)}
                >
                  <h3>{rec["Title"]}</h3>
                  <h4>{rec["People"]}</h4>
                  <small>{rec["Date"]}</small>
                  {expandedIndex === index && (
                    <div className="description">
                      <p>{rec["Summary"]}</p>
                    </div>
                  )}
                </div>
              ))
            )
          ) : searchDone ? (
            <span className="recombuttonpanel">No recommendations found.</span>
          ) : (
            <p></p>
          )}
        </div>
      )}
    </div>
  );
};

export default Recoms;
