// File: src/pages/Episodes.tsx

import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getEpisodes } from "../services/api";
import Pagination from "../components/Pagination";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/Spinner";

const EpisodesContainer = styled.div`
  padding: 30px;
  background: linear-gradient(to bottom, #f7f7f7, #e0e0e0);
  border-radius: 12px;
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

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
    background: linear-gradient(135deg, #d0d0d0, #b0b0b0);
  }
`;

const EpisodeTitle = styled.h3`
  font-size: 1.6em;
  margin: 0;
  color: #333; /* Dark Gray */
`;

const EpisodeInfo = styled.p`
  margin: 8px 0;
  font-size: 1.1em;
  color: #555; /* Medium Gray */
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  padding: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
`;

const FilterInput = styled.input`
  padding: 12px;
  margin: 6px 0;
  border: 1px solid #aaa; /* Light Gray */
  border-radius: 6px;
  width: calc(100% - 24px);
  font-size: 1em;
  color: #333; /* Dark Gray */
  background: #f7f7f7;

  &:focus {
    border-color: #888; /* Medium Gray */
    outline: none;
  }
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  background-color: #555; /* Medium Gray */
  color: #f7f7f7; /* Light Gray */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #888; /* Medium Gray */
    transform: scale(1.02);
  }
`;

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

const Episodes: React.FC = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ name: "", episode: "" });

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

  const handleFilterChange = (newFilters: {
    name: string;
    episode: string;
  }) => {
    setFilters(newFilters);
    setPage(1); // Reset to the first page when filters are changed
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/episode/${id}`);
  };

  return (
    <Layout>
      <EpisodesContainer>
        <FiltersContainer>
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
