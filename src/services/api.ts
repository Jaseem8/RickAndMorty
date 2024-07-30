import axios from "axios";

// Create an Axios instance with the base URL for the Rick and Morty API
const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api", // Base URL for the API
});

// Function to fetch characters by page number
export const getCharacters = (page: number) =>
  api.get(`/character?page=${page}`);

// Function to search for characters by name and page number
export const searchCharacters = (name: string = "", page: number = 1) => {
  // Construct query parameters
  const queryParams = new URLSearchParams({
    name, // Character name to search for
    page: page.toString(), // Page number to fetch
  }).toString();

  // Fetch characters with the constructed query parameters
  return api.get(`/character?${queryParams}`);
};

// Function to fetch a specific character by ID
export const getCharacter = (id: number) => api.get(`/character/${id}`);

// Function to fetch locations with pagination
export const getLocations = (page: number = 1) =>
  api.get(`/location?page=${page}`);

// Function to fetch a specific location by ID
export const getLocation = (id: number) => api.get(`/location/${id}`);

// Function to fetch episodes with pagination
export const getEpisodes = (page: number = 1) =>
  api.get(`/episode?page=${page}`);

// Function to fetch a specific episode by ID
export const getEpisode = (id: number) => api.get(`/episode/${id}`);
