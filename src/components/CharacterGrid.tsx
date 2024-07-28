import React from "react";
import CharacterCard from "./CharacterCard";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  border: 1px solid green;
  padding: 10px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CharacterGrid: React.FC<{ characters: any[] }> = ({ characters }) => {
  return (
    <Grid>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Grid>
  );
};

export default CharacterGrid;
