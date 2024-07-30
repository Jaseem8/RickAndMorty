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
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

// Styled section for the character image and details
const CharacterSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch; /* Ensures that both items stretch to the same height */
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Styled image container
const ImageContainer = styled.div`
  position: relative;
  width: 350px;
  height: 435px; /* Fixed height to align with DetailCard */
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-width: 300px;
  }
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

// Styled heading for character name
const CharacterName = styled.h1`
  font-size: 2rem;
  position: absolute;
  background-color: rgba(
    0,
    0,
    0,
    0.6
  ); /* Darker background for better contrast */
  bottom: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  color: #fff; /* White text color for better readability */
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.7); /* Stronger text shadow for a more pronounced effect */
  padding: 10px 0; /* Padding to add some space around the text */
  letter-spacing: 1.5px; /* Slightly increase letter spacing */
  border-bottom-left-radius: 15px; /* Rounded corners for a smoother look */
  border-bottom-right-radius: 15px; /* Rounded corners for a smoother look */
  transition: background-color 0.3s ease; /* Smooth transition for background color change */

  &:hover {
    background-color: rgba(0, 0, 0, 0.8); /* Darker background on hover */
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 8px 0; /* Adjust padding for smaller screens */
  }
`;

// Styled card for character details
const DetailCard = styled.div`
  flex: 1;
  width: 100%;
  height: 425px;
  background: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Styled card item for key-value pairs
const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
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
  max-width: 1000px;
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-height: 200px;
  }
`;

// Styled heading for episodes
const StickyHeading = styled.h2`
  position: sticky;
  top: -20px;
  background: #f7f9fc;
  padding: 10px 10px;
  z-index: 1;
`;

// Styled list item for episode
const EpisodeItem = styled.div`
  font-size: 1.1rem;
  color: #444;
  margin: 8px 0;
  padding: 10px;
  background: #eaf0ff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #c9d8ff;
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
        <CharacterSection>
          <ImageContainer>
            <CharacterImage src={character.image} alt={character.name} />
            <CharacterName>{character.name}</CharacterName>
          </ImageContainer>
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
        </CharacterSection>
        <EpisodesContainer>
          <StickyHeading>Episodes</StickyHeading>
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
