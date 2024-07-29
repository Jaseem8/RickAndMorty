// File: src/components/Filters.tsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled container for filters
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;

// Styled container for each filter group
const FilterGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

// Styled select input for each filter
const FilterSelect = styled.select`
  padding: 8px;
  margin-top: 8px;
`;

// Styled container for chips
const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  position: absolute;
  z-index: 1;
  bottom: 0;
  width: 100%;
  /* border: 1px solid red; */
  /* background-color: #ffffff; */
  justify-content: center;
`;

// Styled chip
const Chip = styled.div`
  padding: 4px 8px;
  background-color: #e0e0e0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1px;
  margin-bottom: 1px;
`;

// Styled chip close button
const ChipCloseButton = styled.span`
  cursor: pointer;
  font-size: 10px;
  color: #000000;
  background-color: #cb2727;
  opacity: 0.5;
  border-radius: 50%;
  border: 1px solid red;
  &:hover {
    transform: scale(1.1);
  }
`;

interface FiltersProps {
  characters: any[]; // Adjust type if necessary
  filteredCharacters: any[];
  setFilteredCharacters: React.Dispatch<React.SetStateAction<any[]>>; // Correct type
}

// Filters component for character filtering options
const Filters: React.FC<FiltersProps> = ({
  characters,
  filteredCharacters,
  setFilteredCharacters,
}) => {
  // State to manage selected filter values
  const [filters, setFilters] = useState({
    status: [] as string[],
    gender: [] as string[],
    species: [] as string[],
    type: [] as string[],
    location: [] as string[],
    episode: [] as string[],
  });

  // State to manage unique data
  const [uniqueStatus, setUniqueStatus] = useState<string[]>([]);
  const [uniqueGender, setUniqueGender] = useState<string[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [uniqueEpisodes, setUniqueEpisodes] = useState<string[]>([]);
  const [uniqueSpecies, setUniqueSpecies] = useState<string[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  // Extract unique data from characters prop
  useEffect(() => {
    const locationsSet = new Set<string>();
    const episodesSet = new Set<string>();
    const speciesSet = new Set<string>();
    const typesSet = new Set<string>();
    const statusSet = new Set<string>();
    const genderSet = new Set<string>();

    filteredCharacters.forEach((character) => {
      if (character.location && character.location.name) {
        locationsSet.add(character.location.name);
      }
      if (character.episode && Array.isArray(character.episode)) {
        character.episode.forEach((episode: string) =>
          episodesSet.add(episode.split("/")[5])
        );
      }
      if (character.species) {
        speciesSet.add(character.species);
      }
      if (character.status) {
        statusSet.add(character.status);
      }
      if (character.gender) {
        genderSet.add(character.gender);
      }
      if (character.type) {
        typesSet.add(character.type);
      }
    });

    setUniqueLocations(Array.from(locationsSet));
    setUniqueEpisodes(Array.from(episodesSet));
    setUniqueSpecies(Array.from(speciesSet));
    setUniqueTypes(Array.from(typesSet));
    setUniqueStatus(Array.from(statusSet));
    setUniqueGender(Array.from(genderSet));
  }, [filteredCharacters]);

  // Apply filters based on the filters state
  useEffect(() => {
    const applyFilters = () => {
      const newCharacters = characters.filter((character) => {
        return (
          (filters.status.length === 0 ||
            filters.status.includes(character.status)) &&
          (filters.gender.length === 0 ||
            filters.gender.includes(character.gender)) &&
          (filters.species.length === 0 ||
            filters.species.includes(character.species)) &&
          (filters.type.length === 0 ||
            filters.type.includes(character.type)) &&
          (filters.location.length === 0 ||
            filters.location.includes(character.location.name)) &&
          (filters.episode.length === 0 ||
            filters.episode.every((ep) =>
              character.episode.includes(
                `https://rickandmortyapi.com/api/episode/${ep}`
              )
            ))
        );
      });
      setFilteredCharacters(newCharacters);
    };

    applyFilters();
  }, [filters, characters, setFilteredCharacters]);

  // Handle filter changes and update the filters state
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    filterName: string
  ) => {
    const { value } = event.target;
    setFilters((prevFilters) => {
      const newValues = prevFilters[
        filterName as keyof typeof filters
      ].includes(value)
        ? prevFilters[filterName as keyof typeof filters]
        : [...prevFilters[filterName as keyof typeof filters], value];
      return { ...prevFilters, [filterName]: newValues };
    });
  };

  const handleRemoveFilterValue = (filterName: string, value: string) => {
    setFilters((prevFilters) => {
      const newValues = prevFilters[filterName as keyof typeof filters].filter(
        (val: string) => val !== value
      );
      return { ...prevFilters, [filterName]: newValues };
    });
  };

  return (
    <FilterContainer>
      {/* Status filter */}
      <FilterGroup>
        <ChipContainer>
          {filters.status.map((status) => (
            <Chip key={status}>
              {status}
              <ChipCloseButton
                onClick={() => handleRemoveFilterValue("status", status)}
              >
                &times;
              </ChipCloseButton>
            </Chip>
          ))}
        </ChipContainer>
        <FilterSelect
          name="status"
          value=""
          onChange={(e) => handleFilterChange(e, "status")}
          disabled={filters.status.length > 0}
        >
          <option value="">Select Status</option>
          {uniqueStatus.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      {/* Gender filter */}
      <FilterGroup>
        <ChipContainer>
          {filters.gender.map((gender) => (
            <Chip key={gender}>
              {gender}
              <ChipCloseButton
                onClick={() => handleRemoveFilterValue("gender", gender)}
              >
                &times;
              </ChipCloseButton>
            </Chip>
          ))}
        </ChipContainer>
        <FilterSelect
          name="gender"
          value=""
          onChange={(e) => handleFilterChange(e, "gender")}
          disabled={filters.gender.length > 0}
        >
          <option value="">Select Gender</option>
          {uniqueGender.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      {/* Species filter */}
      <FilterGroup>
        <ChipContainer>
          {filters.species.map((species) => (
            <Chip key={species}>
              {species}
              <ChipCloseButton
                onClick={() => handleRemoveFilterValue("species", species)}
              >
                &times;
              </ChipCloseButton>
            </Chip>
          ))}
        </ChipContainer>
        <FilterSelect
          name="species"
          value=""
          onChange={(e) => handleFilterChange(e, "species")}
          disabled={filters.species.length > 0}
        >
          <option value="">Select Species</option>
          {uniqueSpecies.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      {/* Type filter */}
      <FilterGroup>
        <ChipContainer>
          {filters.type.map((type) => (
            <Chip key={type}>
              {type}
              <ChipCloseButton
                onClick={() => handleRemoveFilterValue("type", type)}
              >
                &times;
              </ChipCloseButton>
            </Chip>
          ))}
        </ChipContainer>
        <FilterSelect
          name="type"
          value=""
          onChange={(e) => handleFilterChange(e, "type")}
          disabled={filters.type.length > 0}
        >
          <option value="">Select Type</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      {/* Location filter */}
      <FilterGroup>
        <ChipContainer>
          {filters.location.map((location) => (
            <Chip key={location}>
              {location}
              <ChipCloseButton
                onClick={() => handleRemoveFilterValue("location", location)}
              >
                &times;
              </ChipCloseButton>
            </Chip>
          ))}
        </ChipContainer>
        <FilterSelect
          name="location"
          value=""
          onChange={(e) => handleFilterChange(e, "location")}
          disabled={filters.location.length > 0}
        >
          <option value="">Select Location</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      {/* Episode filter */}
      <FilterGroup>
        <ChipContainer>
          {filters.episode.map((episode) => (
            <Chip key={episode}>
              Episode {episode}
              <ChipCloseButton
                onClick={() => handleRemoveFilterValue("episode", episode)}
              >
                &times;
              </ChipCloseButton>
            </Chip>
          ))}
        </ChipContainer>
        <FilterSelect
          name="episode"
          value=""
          onChange={(e) => handleFilterChange(e, "episode")}
          disabled={filters.episode.length > 0}
        >
          <option value="">Select Episode</option>
          {uniqueEpisodes.map((episode) => (
            <option key={episode} value={episode}>
              Episode {episode}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>
    </FilterContainer>
  );
};

export default Filters;
