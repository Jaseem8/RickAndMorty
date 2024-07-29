// File: src/components/CharacterGrid.tsx

import React from "react";
import CharacterCard from "./CharacterCard";
import styled from "styled-components";

// Styled grid container for character cards
const Grid = styled.div`
  display: grid;
  margin: 20px auto;
  width: 90%;
  max-width: 1200px;
  align-content: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #f9f9f9;

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

// Styled grid item for better spacing and alignment
const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
        <GridItem key={character.id}>
          <CharacterCard character={character} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default CharacterGrid;
