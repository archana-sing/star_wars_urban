import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import logo from "./star-wars-logo.png";
import loadingGif from "../../images/loading-gif-orange-10.gif";
import searchIcon from "../../images/search-button.png";
import { getPeople, getPerson } from "../../Redux/action";
import { useHistory } from "react-router";

// Styled component for showing suggetions
const Suggestions = styled.div`
  display: ${({ len }) => (len !== 0 ? "flex" : "none")};
  padding: 5px;
  flex-direction: column;
  font-weight: 400;
  font-size: 12px;
  max-height: 400px;
  overflow: auto;
  padding-left: 0px;
  color: white;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  & * {
    flex: 1;
    padding: 10px;
    height: 15px;
    cursor: pointer;
  }
  & :nth-child(${({ active }) => active}) {
    background-color: black;
    color: white;
    font-weight: bold;
  }
`;

function HomePage() {
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showCross, setShowCross] = React.useState(false);
  const [showSearchIcon, setShowSearchIcon] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [active, setActive] = React.useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.data);

  // Function to search for the result based on query
  function getResult(query) {
    let output = people
      .filter((person) => person.name.toLowerCase().includes(query))
      .map((person) => person);

    setSuggestions(output);
    setLoading(false);
  }

  // Debounce function
  const debounce = function (fn, d) {
    let timer;
    let context = this;
    clearTimeout(timer);
    return function () {
      timer = setTimeout(() => {
        fn.apply(context, arguments);
        setShowCross(true);
        setLoading(false);
        setShowSearchIcon(true);
      }, d);
    };
  };
  const betterFunction = debounce(getResult, 500);

  React.useEffect(() => {
    dispatch(getPeople());
    if (loading) {
      setShowSearchIcon(false);
    }
    if (query) {
      betterFunction(query);
    } else {
      setLoading(false);
      setShowCross(false);
      setShowSearchIcon(false);
      setSuggestions([]);
    }
  }, [query]);

  //function to handle when user click on one of the suggestions
  const handleClick = () => {
    let url = suggestions[active - 1].url;
    console.log(url);
    let split_url = url.split("/");
    let id = split_url[split_url.length - 2];
    dispatch(getPerson(url));
    history.push(`/person/${id}`);
  };

  // Funtion to handle changes when user press down arrow, up arrow ,and enter key
  const handleChangeActiveSuggestion = (e) => {
    console.log(active);
    switch (e.keyCode) {
      case 40: {
        if (active >= suggestions.length) {
          setActive(0);
        } else {
          setActive((prev) => prev + 1);
        }

        break;
      }
      case 38: {
        if (active === 1) {
          setActive(1);
        } else if (active === 0) {
          setActive(suggestions.length - 1);
        } else {
          setActive((prev) => prev - 1);
        }

        break;
      }
      case 13: {
        let url = suggestions[active - 1].url;
        console.log(url);
        let split_url = url.split("/");
        let id = split_url[split_url.length - 2];
        dispatch(getPerson(url));
        history.push(`/person/${id}`);
        break;
      }
      default: {
        return;
      }
    }
  };

  //Function to handle changes in search bar
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setLoading(true);
  };
  const handleClear = () => {
    setQuery("");
    setLoading(false);
  };

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>

      <div className="search-input" onKeyUp={handleChangeActiveSuggestion}>
        <input
          className="search-input_input-box"
          value={query}
          placeholder="Search by name"
          onChange={handleInputChange}
        />
        <div>
          {showCross && (
            <span className="search-input_clear-input" onClick={handleClear}>
              x
            </span>
          )}
          {loading && (
            <img
              style={{ marginLeft: "20px" }}
              src={loadingGif}
              alt="loading"
              height="18px"
            />
          )}
          {showSearchIcon && (
            <img
              style={{ marginLeft: "10px" }}
              src={searchIcon}
              alt="search-icon"
              height="20px"
            />
          )}
        </div>
      </div>
      <Suggestions len={suggestions.length} active={active}>
        {suggestions.map((e, i) => (
          <div
            key={e.url}
            onMouseOver={() => setActive(i + 1)}
            onClick={handleClick}
          >
            {e.name}
          </div>
        ))}
      </Suggestions>
    </div>
  );
}

export default HomePage;
