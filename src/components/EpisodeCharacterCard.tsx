// File: src/components/EpisodeCharacterCard.tsx

import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: linear-gradient(135deg, #f9f9f9, #f1f1f1);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #f1f1f1, #e2e2e2);
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  border: 2px solid #e1e8ed;
  transition: border-color 0.3s ease;

  ${Card}:hover & {
    border-color: #3498db;
  }
`;

const Name = styled.p`
  margin-top: 12px;
  font-size: 1.1em;
  font-weight: bold;
  color: #2c3e50;
`;

const EpisodeCharacterCard: React.FC<{
  character: any;
  onClick: () => void;
}> = ({ character, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Image src={character.image} alt={character.name} />
      <Name>{character.name}</Name>
    </Card>
  );
};

export default EpisodeCharacterCard;
