import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const getCharacters = (page: number) =>
  api.get(`/character?page=${page}`);
export const searchCharacters = (name: string, page: number = 1) =>
  api.get(`/character?name=${name}&page=${page}`);
export const getCharacter = (id: number) => api.get(`/character/${id}`);
export const getLocations = () => api.get("/location");
export const getEpisodes = () => api.get("/episode");
