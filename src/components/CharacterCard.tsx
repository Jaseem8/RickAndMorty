import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled container for character card
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 100%;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 10px;
  }
`;

// Styled image for character card
const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
`;

// Styled container for character details
const CharacterDetails = styled.div`
  padding: 16px;
  background: #fafafa;

  h3 {
    margin: 0;
    color: #333;
  }

  p {
    margin: 4px 0;
    color: #666;
    font-size: 0.9rem;
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
