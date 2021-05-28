import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import logo from "./star-wars-logo.png";
import loadingGif from "../../images/loading-gif-orange-10.gif";
import { getPeople } from "../../Redux/action";
import { useHistory } from "react-router";

const Suggestions = styled.div`
  display: ${({ len }) => (len !== 0 ? "flex" : "none")};
  padding: 5px;
  flex-direction: column;
  max-height: 400px;
  overflow: auto;
  padding-left: 0px;
  color: white;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  & * {
    flex: 1;
    padding: 10px;
    height: 10px;
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
  const [suggestions, setSuggestions] = React.useState([]);
  const [active, setActive] = React.useState(0);
  const history = useHistory();

  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.data);

  React.useEffect(() => {
    dispatch(getPeople());

    if (query) {
      let output = people
        .filter((person) => person.name.toLowerCase().includes(query))
        .map((person) => person);

      setSuggestions(output);
      console.log(suggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleChangeActiveSuggestion = (e) => {
    // console.log(e.keyCode, active);
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
        history.push("/person/:id");
        break;
      }
      default: {
        return;
      }
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
          {query && (
            <span className="search-input_clear-input" onClick={handleClear}>
              x
            </span>
          )}
          {loading && <img src={loadingGif} alt="loading" height="18px" />}
        </div>
      </div>
      <Suggestions len={suggestions.length} active={active}>
        {suggestions.map((e, i) => (
          <div key={e.url} onMouseOver={() => setActive(i + 1)}>
            {e.name}
          </div>
        ))}
      </Suggestions>
    </div>
  );
}

export default HomePage;
