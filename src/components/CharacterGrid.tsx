// File: src/components/CharacterGrid.tsx

import React from "react";
import CharacterCard from "./CharacterCard";
import styled from "styled-components";

// Styled grid container for character cards
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  border: 1px solid green;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

interface CharacterGridProps {
  characters: any[];
}

// CharacterGrid component to display a grid of character cards
const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
  return (
    <Grid>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Grid>
  );
};

export default CharacterGrid;
