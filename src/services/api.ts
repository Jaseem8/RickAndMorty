// File: src/services/api.ts

import axios from "axios";

// Create an Axios instance with the base URL for the Rick and Morty API
const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

// Fetch characters by page
export const getCharacters = (page: number) =>
  api.get(`/character?page=${page}`);

// Fetch characters by search query and filters, including page number
export const searchCharacters = (
  name: string = "",
  filters: any = {},
  page: number = 1
) => {
  // Convert filters and page number to query parameters
  const queryParams = new URLSearchParams({
    name,
    page: page.toString(),
    ...filters,
  }).toString();
  console.log(queryParams);
  // Perform API request with query parameters
  return api.get(`/character?${queryParams}`);
};

// Fetch a specific character by ID
export const getCharacter = (id: number) => api.get(`/character/${id}`);

// Fetch all locations
export const getLocations = () => api.get("/location");

// Fetch all episodes
export const getEpisodes = () => api.get("/episode");
