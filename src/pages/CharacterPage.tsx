// File: src/pages/CharacterPage.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCharacter } from "../services/api";
import styled from "styled-components";

// Styled container for the character page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f0f0f0, #dcecf9);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

// Styled image of the character
const CharacterImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 4px solid #fff;
  margin-bottom: 20px;
`;

// Styled heading for character name
const CharacterName = styled.h1`
  font-size: 2.5rem;
  margin: 10px 0;
  color: #2c3e50;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

// Styled list container for character details
const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 600px;
`;

// Styled list item for character detail
const DetailItem = styled.li`
  font-size: 1.2rem;
  color: #34495e;
  margin: 8px 0;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Styled list item for episode
const EpisodeItem = styled.li`
  font-size: 1rem;
  color: #2c3e50;
  margin: 5px 0;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    getCharacter(Number(id)).then((response) => setCharacter(response.data));
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <Container>
      <CharacterImage src={character.image} alt={character.name} />
      <CharacterName>{character.name}</CharacterName>
      <DetailsList>
        <DetailItem>Status: {character.status}</DetailItem>
        <DetailItem>Species: {character.species}</DetailItem>
        <DetailItem>Type: {character.type || "N/A"}</DetailItem>
        <DetailItem>Gender: {character.gender}</DetailItem>
        <DetailItem>Origin: {character.origin.name}</DetailItem>
        <DetailItem>Location: {character.location.name}</DetailItem>
        <DetailItem>
          Created: {new Date(character.created).toLocaleDateString()}
        </DetailItem>
        <DetailItem>
          Episodes:
          <ul>
            {character.episode.map((episodeUrl: string, index: number) => (
              <EpisodeItem key={index}>{episodeUrl}</EpisodeItem>
            ))}
          </ul>
        </DetailItem>
      </DetailsList>
    </Container>
  );
};

export default CharacterPage;
