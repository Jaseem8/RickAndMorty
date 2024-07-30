import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacter } from "../services/api";
import styled from "styled-components";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/Spinner";

// Styled container for the character page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

// Styled image container
const ImageContainer = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
`;

// Styled image of the character
const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// Styled header section
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

// Styled heading for character name
const CharacterName = styled.h1`
  font-size: 3rem;
  margin: 10px 0;
  color: #333;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
`;

// Styled card for character details
const DetailCard = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  background: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

// Styled card item for key-value pairs
const DetailItem = styled.div`
  flex: 1 1 45%;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: #555;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
  }

  & > span {
    font-weight: bold;
    color: #333;
  }

  & > button {
    background: none;
    border: none;
    color: #007bff;
    font-size: 1.2rem;
    cursor: pointer;
    font-weight: bold;
    text-align: right;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Styled list container for episodes
const EpisodesContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  background: #f7f9fc; /* Light background for episodes */
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-height: 300px; /* Fixed height for scrollable content */
  overflow-y: auto; /* Enable vertical scrolling */
`;

// Styled list item for episode
const EpisodeItem = styled.div`
  font-size: 1.1rem;
  color: #444;
  margin: 8px 0;
  padding: 10px;
  background: #eaf0ff; /* Light blue background for episodes */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #c9d8ff; /* Slightly darker blue on hover */
    transform: scale(1.02);
  }
`;

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCharacter(Number(id)).then((response) => setCharacter(response.data));
  }, [id]);

  if (!character) return <LoadingSpinner />;

  // Function to handle navigation to EpisodePage
  const handleEpisodeClick = (episodeUrl: string) => {
    const episodeId = episodeUrl.split("/").pop(); // Extract the episode ID from the URL
    navigate(`/episode/${episodeId}`);
  };

  // Function to handle navigation to LocationPage
  const handleLocationClick = () => {
    const locationId = character.location.url.split("/").pop(); // Extract the location ID from the URL
    navigate(`/location/${locationId}`);
  };

  return (
    <Layout>
      <Container>
        <Header>
          <ImageContainer>
            <CharacterImage src={character.image} alt={character.name} />
          </ImageContainer>
          <CharacterName>{character.name}</CharacterName>
        </Header>
        <DetailCard>
          <DetailItem>
            <span>Status:</span>
            <span>{character.status}</span>
          </DetailItem>
          <DetailItem>
            <span>Species:</span>
            <span>{character.species}</span>
          </DetailItem>
          <DetailItem>
            <span>Type:</span>
            <span>{character.type || "N/A"}</span>
          </DetailItem>
          <DetailItem>
            <span>Gender:</span>
            <span>{character.gender}</span>
          </DetailItem>
          <DetailItem>
            <span>Location:</span>
            <button onClick={handleLocationClick}>
              {character.location.name}
            </button>
          </DetailItem>
          <DetailItem>
            <span>Origin:</span>
            <span>{character.origin.name}</span>
          </DetailItem>
          <DetailItem>
            <span>Created:</span>
            <span>{new Date(character.created).toLocaleDateString()}</span>
          </DetailItem>
        </DetailCard>
        <EpisodesContainer>
          <h2>Episodes</h2>
          {character.episode.map((episodeUrl: string, index: number) => (
            <EpisodeItem
              key={index}
              onClick={() => handleEpisodeClick(episodeUrl)}
            >
              Episode {index + 1}
            </EpisodeItem>
          ))}
        </EpisodesContainer>
      </Container>
    </Layout>
  );
};

export default CharacterPage;
