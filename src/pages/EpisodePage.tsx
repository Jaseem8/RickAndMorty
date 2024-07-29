// File: src/pages/EpisodePage.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEpisode } from "../services/api"; // Add this function to your API service
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const EpisodeTitle = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
  color: #333;
`;

const EpisodeDetails = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const EpisodeInfo = styled.p`
  margin: 10px 0;
  font-size: 1.1em;
  color: #555;
`;

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
`;

const CharacterCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const CharacterName = styled.p`
  margin-top: 10px;
  font-size: 1em;
  font-weight: bold;
  color: #333;
`;

const EpisodePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEpisode(Number(id));
        setEpisode(response.data);
        const characterResponses = await Promise.all(
          response.data.characters.map((url: string) =>
            fetch(url).then((res) => res.json())
          )
        );
        setCharacters(characterResponses);
      } catch (error) {
        console.error("Failed to fetch episode details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!episode) return <div>Loading...</div>;

  const handleCharacterClick = (characterId: number) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <PageContainer>
      <EpisodeDetails>
        <EpisodeTitle>{episode.name}</EpisodeTitle>
        <EpisodeInfo>Air Date: {episode.air_date}</EpisodeInfo>
        <EpisodeInfo>Episode Code: {episode.episode}</EpisodeInfo>
      </EpisodeDetails>
      <h2>Characters</h2>
      <CharactersGrid>
        {characters.map((character: any) => (
          <CharacterCard
            key={character.id}
            onClick={() => handleCharacterClick(character.id)}
          >
            <CharacterImage src={character.image} alt={character.name} />
            <CharacterName>{character.name}</CharacterName>
          </CharacterCard>
        ))}
      </CharactersGrid>
    </PageContainer>
  );
};

export default EpisodePage;
