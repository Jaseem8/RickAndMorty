import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCharacter } from "../services/api";

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    getCharacter(Number(id)).then((response) => setCharacter(response.data));
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
      {/* Add more character details */}
    </div>
  );
};

export default CharacterPage;
