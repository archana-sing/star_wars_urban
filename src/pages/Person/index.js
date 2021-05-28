import React from "react";
import { useSelector } from "react-redux";
import star_wars from "../../images/star_wars.jpg";
import "./index.css";

function Person() {
  const person = useSelector((state) => state.people.person);
  console.log(person);

  return (
    <div className="person">
      <div>
        <img className="person_image" src={star_wars} alt={person.name} />
      </div>
      <div className="person-info">
        <h1>{person.name}</h1>
        <h3>Birth Year : {person.birth_year}</h3>
        <h3>Height : {person.height}</h3>
        <h3>Mass : {person.mass}</h3>
        <h3>Gender : {person.gender}</h3>
        <h3>Skin Color : {person.skin_color}</h3>
        <h3>Eye Color : {person.eye_color}</h3>
        <h3>Hair Color : {person.hair_color}</h3>
      </div>
    </div>
  );
}

export default Person;
