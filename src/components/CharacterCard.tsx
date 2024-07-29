// File: src/components/CharacterCard.tsx

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled container for character card
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s;
  max-width: 100%;

  &:hover {
    transform: scale(1.05);
  }
`;

// Styled image for character card
const CharacterImage = styled.img`
  width: 100%;
  height: auto;
`;

// Styled container for character details
const CharacterDetails = styled.div`
  padding: 16px;
`;

interface CharacterCardProps {
  character: any;
}

// CharacterCard component to display individual character details
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Card>
      <Link to={`/character/${character.id}`}>
        <CharacterImage src={character.image} alt={character.name} />
        <CharacterDetails>
          <h3>{character.name}</h3>
          {/* <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p> */}
        </CharacterDetails>
      </Link>
    </Card>
  );
};

export default CharacterCard;
