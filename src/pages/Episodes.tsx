// File: src/pages/Episodes.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEpisodes } from "../services/api";
import Layout from "../components/Layout";
import styled from "styled-components";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

const EpisodesContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  width: 200px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const EpisodesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const EpisodeCard = styled.div`
  background: linear-gradient(145deg, #f3f3f3, #e1e1e1);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const EpisodeTitle = styled.h3`
  font-size: 1.5em;
  margin: 0;
  color: #333;
`;

const EpisodeInfo = styled.p`
  margin: 10px 0;
  font-size: 1.1em;
  color: #555;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  font-size: 1.1em;
  color: #333;
`;

const Episodes: React.FC = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [episodeFilter, setEpisodeFilter] = useState<string>("");

  // Fetch episodes based on page number
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEpisodes();
        setEpisodes(response.data.results);
        setFilteredEpisodes(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    };

    fetchData();
  }, []);

  // Apply filters to the episodes
  useEffect(() => {
    const applyFilters = () => {
      const newFilteredEpisodes = episodes.filter((episode) => {
        return (
          (nameFilter === "" ||
            episode.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
          (episodeFilter === "" ||
            episode.episode.toLowerCase().includes(episodeFilter.toLowerCase()))
        );
      });
      setFilteredEpisodes(newFilteredEpisodes);
      setPage(1); // Reset to first page when filtering
    };

    applyFilters();
  }, [nameFilter, episodeFilter, episodes]);

  // Handle filter changes
  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameFilter(event.target.value);
  };

  const handleEpisodeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEpisodeFilter(event.target.value);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle episode click
  const handleEpisodeClick = (id: number) => {
    navigate(`/episode/${id}`);
  };

  return (
    <Layout>
      <EpisodesContainer>
        <FilterContainer>
          <FilterInput
            type="text"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={handleNameFilterChange}
          />
          <FilterInput
            type="text"
            placeholder="Filter by episode code"
            value={episodeFilter}
            onChange={handleEpisodeFilterChange}
          />
        </FilterContainer>
        <EpisodesGrid>
          {filteredEpisodes.slice((page - 1) * 10, page * 10).map((episode) => (
            <EpisodeCard
              key={episode.id}
              onClick={() => handleEpisodeClick(episode.id)}
            >
              <EpisodeTitle>{episode.name}</EpisodeTitle>
              <EpisodeInfo>Air Date: {episode.air_date}</EpisodeInfo>
              <EpisodeInfo>Episode Code: {episode.episode}</EpisodeInfo>
            </EpisodeCard>
          ))}
        </EpisodesGrid>
        <Pagination>
          <PaginationButton
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </PaginationButton>
          <PaginationInfo>
            Page {page} of {totalPages}
          </PaginationInfo>
          <PaginationButton
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </PaginationButton>
        </Pagination>
      </EpisodesContainer>
    </Layout>
  );
};

export default Episodes;
