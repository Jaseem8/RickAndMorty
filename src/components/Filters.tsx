// File: src/components/Filters.tsx

import React from "react";
import styled from "styled-components";
import FilterGroup from "./FilterGroup";
import useFilters from "../hooks/useFilters";

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 25px auto;
  padding: 10px;
  width: 95%;
  max-width: 1200px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 8px;
  color: #333;
`;

const ResetButton = styled.button`
  padding: 8px 16px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 16px;

  &:hover {
    background-color: #e63946;
  }
`;

interface FiltersProps {
  characters: any[];
  filteredCharacters: any[];
  setFilteredCharacters: React.Dispatch<React.SetStateAction<any[]>>;
}

const Filters: React.FC<FiltersProps> = ({
  characters,
  filteredCharacters,
  setFilteredCharacters,
}) => {
  const {
    filters,
    uniqueStatus,
    uniqueGender,
    uniqueLocations,
    uniqueEpisodes,
    uniqueSpecies,
    uniqueTypes,
    handleFilterChange,
    handleRemoveFilterValue,
    resetFilters, // Function to reset filters
  } = useFilters(characters, filteredCharacters, setFilteredCharacters);

  return (
    <FilterContainer>
      <FilterTitle>Filters</FilterTitle>
      <FilterGroup
        filterName="status"
        filterValues={filters.status}
        uniqueValues={uniqueStatus}
        handleFilterChange={handleFilterChange}
        handleRemoveFilterValue={handleRemoveFilterValue}
      />
      <FilterGroup
        filterName="gender"
        filterValues={filters.gender}
        uniqueValues={uniqueGender}
        handleFilterChange={handleFilterChange}
        handleRemoveFilterValue={handleRemoveFilterValue}
      />
      <FilterGroup
        filterName="species"
        filterValues={filters.species}
        uniqueValues={uniqueSpecies}
        handleFilterChange={handleFilterChange}
        handleRemoveFilterValue={handleRemoveFilterValue}
      />
      <FilterGroup
        filterName="type"
        filterValues={filters.type}
        uniqueValues={uniqueTypes}
        handleFilterChange={handleFilterChange}
        handleRemoveFilterValue={handleRemoveFilterValue}
      />
      <FilterGroup
        filterName="location"
        filterValues={filters.location}
        uniqueValues={uniqueLocations}
        handleFilterChange={handleFilterChange}
        handleRemoveFilterValue={handleRemoveFilterValue}
      />
      <FilterGroup
        filterName="episode"
        filterValues={filters.episode}
        uniqueValues={uniqueEpisodes}
        handleFilterChange={handleFilterChange}
        handleRemoveFilterValue={handleRemoveFilterValue}
      />
      <ResetButton onClick={resetFilters}>Reset Filters</ResetButton>
    </FilterContainer>
  );
};

export default Filters;
