import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getEpisodes } from "../services/api";
import Pagination from "../components/Pagination";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/Spinner";

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled-components for styling the components
const EpisodesContainer = styled.div`
  padding: 30px;
  background: linear-gradient(to bottom, #f7f7f7, #e0e0e0);
  border-radius: 12px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const EpisodesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const EpisodeCard = styled.div`
  border-radius: 10px;
  padding: 20px;
  background: linear-gradient(135deg, #b0b0b0, #d0d0d0);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  animation: ${slideIn} 0.5s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
    background: linear-gradient(135deg, #d0d0d0, #b0b0b0);
  }
`;

const EpisodeTitle = styled.h3`
  font-size: 1.6em;
  margin: 0;
  color: #333;
  text-decoration: underline;
  text-decoration-color: #999;
  transition: text-decoration-color 0.3s ease, color 0.3s ease;

  ${EpisodeCard}:hover & {
    text-decoration-color: #666;
    color: #000;
  }
`;

const EpisodeInfo = styled.p`
  margin: 8px 0;
  font-size: 1.1em;
  color: #555;
  font-style: italic;
  transition: color 0.3s ease;

  ${EpisodeCard}:hover & {
    color: #333;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  padding: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const FilterInput = styled.input`
  padding: 12px;
  margin: 6px 0;
  border: 1px solid #aaa;
  border-radius: 6px;
  width: calc(100% - 24px);
  font-size: 1em;
  color: #333;
  background: #f7f7f7;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:focus {
    border-color: #888;
    background-color: #fff;
    outline: none;
  }
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  background-color: #555;
  color: #f7f7f7;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #888;
    transform: scale(1.02);
    color: #000;
  }
`;

// Interface for the episode data structure
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

// Episodes component
const Episodes: React.FC = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ name: "", episode: "" });

  // Fetch episodes data when the page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEpisodes(page);
        setEpisodes(response.data.results);
        setFilteredEpisodes(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    };

    fetchData();
  }, [page]);

  // Apply filters whenever filters or episodes change
  useEffect(() => {
    const applyFilters = () => {
      const newFilteredEpisodes = episodes.filter((episode) => {
        return (
          (filters.name === "" ||
            episode.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.episode === "" ||
            episode.episode
              .toLowerCase()
              .includes(filters.episode.toLowerCase()))
        );
      });
      setFilteredEpisodes(newFilteredEpisodes);
    };

    applyFilters();
  }, [filters, episodes]);

  // Handle filter changes and reset to the first page
  const handleFilterChange = (newFilters: {
    name: string;
    episode: string;
  }) => {
    setFilters(newFilters);
    setPage(1); // Reset to the first page when filters are changed
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Navigate to episode detail page on card click
  const handleCardClick = (id: number) => {
    navigate(`/episode/${id}`);
  };

  return (
    <Layout>
      <EpisodesContainer>
        <FiltersContainer>
          {/* Filter inputs for name and episode code */}
          <FilterInput
            type="text"
            placeholder="Name"
            value={filters.name}
            onChange={(e) =>
              handleFilterChange({ ...filters, name: e.target.value })
            }
          />
          <FilterInput
            type="text"
            placeholder="Episode Code"
            value={filters.episode}
            onChange={(e) =>
              handleFilterChange({ ...filters, episode: e.target.value })
            }
          />
          <FilterButton onClick={() => handleFilterChange(filters)}>
            Apply Filters
          </FilterButton>
        </FiltersContainer>
        <Suspense fallback={<LoadingSpinner />}>
          <EpisodesGrid>
            {/* Display filtered episodes */}
            {filteredEpisodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                onClick={() => handleCardClick(episode.id)}
              >
                <EpisodeTitle>{episode.name}</EpisodeTitle>
                <EpisodeInfo>Air Date: {episode.air_date}</EpisodeInfo>
                <EpisodeInfo>Episode Code: {episode.episode}</EpisodeInfo>
              </EpisodeCard>
            ))}
          </EpisodesGrid>
        </Suspense>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </EpisodesContainer>
    </Layout>
  );
};

export default Episodes;
