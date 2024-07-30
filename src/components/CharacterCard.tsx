import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled container for character card
const Card = styled.div`
  border-radius: 10px;
  padding: 20px;
  background: #f5f5f5; /* Light Gray */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    background: #e0e0e0; /* Slightly Darker Gray */
  }
`;

// Styled image for character card
const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ccc;
`;

// Styled container for character details
const CharacterDetails = styled.div`
  padding: 16px;
  background: #f5f5f5; /* White Background */

  h3 {
    margin: 0;
    color: #333; /* Dark Gray */
    font-size: 1.4em;
  }

  p {
    margin: 8px 0;
    color: #666; /* Medium Gray */
    font-size: 1.1em;
  }
`;

// Styled link to character detail page
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// Define interface for character prop type
interface CharacterCardProps {
  character: {
    id: string;
    image: string;
    name: string;
    status: string;
    species: string;
    gender: string;
  };
}

// CharacterCard component to display individual character details
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Card>
      <StyledLink to={`/character/${character.id}`}>
        <CharacterImage src={character.image} alt={character.name} />
        <CharacterDetails>
          <h3>{character.name}</h3>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
        </CharacterDetails>
      </StyledLink>
    </Card>
  );
};

export default CharacterCard;
