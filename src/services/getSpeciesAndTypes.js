// // File: src/services/getSpeciesAndTypes.js

// const axios = require("axios");

// // Create an Axios instance with the base URL for the Rick and Morty API
// const api = axios.create({
//   baseURL: "https://rickandmortyapi.com/api",
// });

// // Fetch all characters from the API, handling pagination
// const fetchAllCharacters = async () => {
//   let characters = [];
//   let nextPage = 1;
//   let totalPages = 1;

//   // Fetch characters page by page until all pages are fetched
//   while (nextPage <= totalPages) {
//     try {
//       const response = await api.get(`/character?page=${nextPage}`);
//       characters = characters.concat(response.data.results);
//       totalPages = response.data.info.pages;
//       nextPage += 1;
//     } catch (error) {
//       console.error("Failed to fetch characters:", error);
//       break;
//     }
//   }

//   return characters;
// };

// // Extract unique species and type values from the character data
// const extractUniqueValues = (characters) => {
//   const speciesSet = new Set();
//   const typeSet = new Set();

//   // Iterate over each character to add species and type values to the sets
//   characters.forEach((character) => {
//     if (character.species) speciesSet.add(character.species);
//     if (character.type) typeSet.add(character.type);
//   });

//   return {
//     species: Array.from(speciesSet),
//     types: Array.from(typeSet),
//   };
// };

// // Main function to get unique species and type values
// const getSpeciesAndTypes = async () => {
//   const characters = await fetchAllCharacters();
//   return extractUniqueValues(characters);
// };

// module.exports = getSpeciesAndTypes;
