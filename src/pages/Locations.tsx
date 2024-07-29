// File: src/pages/Locations.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getLocations } from "../services/api";
import Pagination from "../components/Pagination";
import Layout from "../components/Layout";

const LocationsContainer = styled.div`
  padding: 20px;
  background: linear-gradient(to bottom, #f5f5f5, #ffffff);
`;

const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const LocationCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #fff;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const LocationName = styled.h3`
  font-size: 1.4em;
  margin: 0;
  color: #333;
`;

const LocationType = styled.p`
  margin: 4px 0;
  font-size: 1em;
  color: #666;
`;

const LocationDimension = styled.p`
  margin: 4px 0;
  font-size: 1em;
  color: #666;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  padding: 15px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FilterInput = styled.input`
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: calc(100% - 22px);
  font-size: 1em;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const FilterButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface FiltersProps {
  onFilterChange: (filters: {
    name: string;
    type: string;
    dimension: string;
  }) => void;
}

// Filters component for filtering by name, type, and dimension
const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ name, type, dimension });
  };

  return (
    <FiltersContainer>
      <FilterInput
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FilterInput
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <FilterInput
        type="text"
        placeholder="Dimension"
        value={dimension}
        onChange={(e) => setDimension(e.target.value)}
      />
      <FilterButton onClick={handleFilterChange}>Apply Filters</FilterButton>
    </FiltersContainer>
  );
};

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ name: "", type: "", dimension: "" });

  const navigate = useNavigate(); // Updated from useHistory to useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLocations(page);
        setLocations(response.data.results);
        setFilteredLocations(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const applyFilters = () => {
      const newFilteredLocations = locations.filter(
        (location) =>
          (!filters.name ||
            location.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (!filters.type ||
            location.type.toLowerCase().includes(filters.type.toLowerCase())) &&
          (!filters.dimension ||
            location.dimension
              .toLowerCase()
              .includes(filters.dimension.toLowerCase()))
      );
      setFilteredLocations(newFilteredLocations);
    };

    applyFilters();
  }, [filters, locations]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to the first page when filters are changed
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/location/${id}`); // Updated from history.push to navigate
  };

  return (
    <Layout>
      <LocationsContainer>
        <Filters onFilterChange={handleFilterChange} />
        <LocationsGrid>
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              onClick={() => handleCardClick(location.id)}
            >
              <LocationName>{location.name}</LocationName>
              <LocationType>Type: {location.type}</LocationType>
              <LocationDimension>
                Dimension: {location.dimension}
              </LocationDimension>
            </LocationCard>
          ))}
        </LocationsGrid>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </LocationsContainer>
    </Layout>
  );
};

export default Locations;
