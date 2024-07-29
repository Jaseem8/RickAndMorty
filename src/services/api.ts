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
  const queryParams = new URLSearchParams({
    name,
    page: page.toString(),
    ...filters,
  }).toString();
  console.log(queryParams);
  return api.get(`/character?${queryParams}`);
};

// Fetch a specific character by ID
export const getCharacter = (id: number) => api.get(`/character/${id}`);

// Fetch locations with pagination
export const getLocations = (page: number = 1) =>
  api.get(`/location?page=${page}`);

export const getLocation = (id: number) => api.get(`/location/${id}`);
// Fetch episodes with pagination
export const getEpisodes = (page: number = 1) =>
  api.get(`/episode?page=${page}`);
export const getEpisode = (id: number) => api.get(`/episode/${id}`);
