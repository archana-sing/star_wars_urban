import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import star_wars from "../../images/star_wars.jpg";
import "./index.css";

function Person() {
  const person = useSelector((state) => state.people.person);
  const history = useHistory();

  // function to handle Go to main page button
  const handleClick = () => {
    history.push("/");
  };

  return (
    <>
      <h1 style={{ color: "#ecd014" }}>{person.name}</h1>
      <div className="person">
        <div>
          <img className="person_image" src={star_wars} alt={person.name} />
        </div>
        <div className="person-info">
          <h3>Birth Year : {person.birth_year}</h3>
          <h3>Height : {person.height} ft</h3>
          <h3>Mass : {person.mass} Kg</h3>
          <h3>Gender : {person.gender}</h3>
          <h3>Skin Color : {person.skin_color}</h3>
          <h3>Eye Color : {person.eye_color}</h3>
          <h3>Hair Color : {person.hair_color}</h3>
        </div>
      </div>
      <button className="go-back-button" onClick={handleClick}>
        Go back to main
      </button>
    </>
  );
}

export default Person;
