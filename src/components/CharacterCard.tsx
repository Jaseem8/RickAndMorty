import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  max-width: 200px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%; // This gives a 1:1 aspect ratio
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const CharacterInfo = styled.div`
  padding: 16px;
  text-align: center;
`;

const CharacterCard: React.FC<{ character: any }> = ({ character }) => {
  return (
    <Card>
      <Link to={`/character/${character.id}`}>
        <ImageWrapper>
          <Image src={character.image} alt={character.name} />
        </ImageWrapper>
        <CharacterInfo>
          <h3>{character.name}</h3>
        </CharacterInfo>
      </Link>
    </Card>
  );
};

export default CharacterCard;
