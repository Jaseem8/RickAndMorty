// File: src/pages/EpisodePage.tsx

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEpisode } from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/Spinner";

const PageContainer = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(to right, #f0f4f8, #e0e6ef);
  border-radius: 15px;
`;

const EpisodeTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 15px;
  color: #2c3e50;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const EpisodeDetails = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin-bottom: 25px;
  border: 1px solid #e1e8ed;
  text-align: center;
`;

const EpisodeInfo = styled.p`
  margin: 12px 0;
  font-size: 1.2em;
  color: #34495e;
`;

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const CharacterCard = styled.div`
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

const CharacterImage = styled.img`
  width: 100%;
  border-radius: 10px;
  border: 2px solid #e1e8ed;
  transition: border-color 0.3s ease;

  ${CharacterCard}:hover & {
    border-color: #3498db;
  }
`;

const CharacterName = styled.p`
  margin-top: 12px;
  font-size: 1.1em;
  font-weight: bold;
  color: #2c3e50;
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

  if (!episode) return <LoadingSpinner />;

  const handleCharacterClick = (characterId: number) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <Layout>
      <PageContainer>
        <EpisodeDetails>
          <EpisodeTitle>{episode.name}</EpisodeTitle>
          <EpisodeInfo>Air Date: {episode.air_date}</EpisodeInfo>
          <EpisodeInfo>Episode Code: {episode.episode}</EpisodeInfo>
        </EpisodeDetails>
        <h2
          style={{
            color: "#2c3e50",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Characters
        </h2>
        <CharactersGrid>
          {characters.map((character: any) => (
            <Suspense key={character.id} fallback={<LoadingSpinner />}>
              <CharacterCard onClick={() => handleCharacterClick(character.id)}>
                <CharacterImage src={character.image} alt={character.name} />
                <CharacterName>{character.name}</CharacterName>
              </CharacterCard>
            </Suspense>
          ))}
        </CharactersGrid>
      </PageContainer>
    </Layout>
  );
};

export default EpisodePage;
