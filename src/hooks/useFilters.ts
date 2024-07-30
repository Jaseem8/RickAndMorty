// src/hooks/useFilter.ts

import { useState, useEffect } from "react";

// Custom hook for managing filters and filtered characters
const useFilters = (
  characters: any[],
  filteredCharacters: any[],
  setFilteredCharacters: React.Dispatch<React.SetStateAction<any[]>>
) => {
  // State to hold the selected filters
  const [filters, setFilters] = useState({
    status: [] as string[],
    gender: [] as string[],
    species: [] as string[],
    type: [] as string[],
    location: [] as string[],
    episode: [] as string[],
  });

  // States to hold unique values for each filter category
  const [uniqueStatus, setUniqueStatus] = useState<string[]>([]);
  const [uniqueGender, setUniqueGender] = useState<string[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [uniqueEpisodes, setUniqueEpisodes] = useState<string[]>([]);
  const [uniqueSpecies, setUniqueSpecies] = useState<string[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  // Effect to update unique filter values based on filtered characters
  useEffect(() => {
    const locationsSet = new Set<string>();
    const episodesSet = new Set<string>();
    const speciesSet = new Set<string>();
    const typesSet = new Set<string>();
    const statusSet = new Set<string>();
    const genderSet = new Set<string>();

    // Loop through filtered characters and extract unique values
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

    // Set unique values to state
    setUniqueLocations(Array.from(locationsSet));
    setUniqueEpisodes(Array.from(episodesSet));
    setUniqueSpecies(Array.from(speciesSet));
    setUniqueTypes(Array.from(typesSet));
    setUniqueStatus(Array.from(statusSet));
    setUniqueGender(Array.from(genderSet));
  }, [filteredCharacters]);

  // Effect to apply filters and update filtered characters
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

  // Handler for changing filter values
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

  // Handler for removing a specific filter value
  const handleRemoveFilterValue = (filterName: string, value: string) => {
    setFilters((prevFilters) => {
      const newValues = prevFilters[filterName as keyof typeof filters].filter(
        (val: string) => val !== value
      );
      return { ...prevFilters, [filterName]: newValues };
    });
  };

  // Reset all filters to their initial state
  const resetFilters = () => {
    setFilters({
      status: [],
      gender: [],
      species: [],
      type: [],
      location: [],
      episode: [],
    });
  };

  return {
    filters,
    uniqueStatus,
    uniqueGender,
    uniqueLocations,
    uniqueEpisodes,
    uniqueSpecies,
    uniqueTypes,
    handleFilterChange,
    handleRemoveFilterValue,
    resetFilters, // Return the reset function
  };
};

export default useFilters;
