// File: src/pages/EpisodePage.tsx

import React, { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEpisode } from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/Spinner";

// Lazy load CharacterCard component
const EpisodeCharacterCard = lazy(
  () => import("../components/EpisodeCharacterCard")
);

// Styled components for the page layout and design
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

const EpisodePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the episode ID from the URL parameters
  const [episode, setEpisode] = useState<any>(null); // State to store episode details
  const [characters, setCharacters] = useState<any[]>([]); // State to store characters appearing in the episode
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEpisode(Number(id)); // Fetch episode details by ID
        setEpisode(response.data); // Set episode details in state
        const characterResponses = await Promise.all(
          response.data.characters.map((url: string) =>
            fetch(url).then((res) => res.json())
          )
        );
        setCharacters(characterResponses); // Set characters in state
      } catch (error) {
        console.error("Failed to fetch episode details:", error);
      }
    };

    fetchData();
  }, [id]); // Fetch data when the component mounts or the ID changes

  if (!episode) return <LoadingSpinner />; // Show loading spinner if episode data is not yet loaded

  const handleCharacterClick = (characterId: number) => {
    navigate(`/character/${characterId}`); // Navigate to character page when a character card is clicked
  };

  return (
    <Layout>
      <PageContainer>
        <EpisodeDetails>
          <EpisodeTitle>{episode.name}</EpisodeTitle>{" "}
          {/* Display episode name */}
          <EpisodeInfo>Air Date: {episode.air_date}</EpisodeInfo>{" "}
          {/* Display air date */}
          <EpisodeInfo>Episode Code: {episode.episode}</EpisodeInfo>{" "}
          {/* Display episode code */}
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
            <Suspense fallback={<LoadingSpinner />}>
              <EpisodeCharacterCard
                key={character.id}
                character={character}
                onClick={() => handleCharacterClick(character.id)}
              />{" "}
            </Suspense>
          ))}
        </CharactersGrid>
      </PageContainer>
    </Layout>
  );
};

export default EpisodePage;
