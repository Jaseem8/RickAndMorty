// File: src/pages/HomePage.tsx

import React, { useState, useEffect } from "react";
import CharacterGrid from "../components/CharacterGrid";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { getCharacters, searchCharacters } from "../services/api";
import Pagination from "../components/Pagination";

// HomePage component to display character grid with search and filter functionalities
const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]); // Adjust type if necessary
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch characters based on search query, filters, and page number
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await searchCharacters(searchQuery, page);
        } else {
          response = await getCharacters(page);
        }
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
    };

    fetchData();
  }, [page, searchQuery]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle search input change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
  };

  // Handle filter changes
  const handleFilterChange = (newFilteredCharacters: any) => {
    setFilteredCharacters(newFilteredCharacters);
    //
    setPage(1); // Reset to first page when filtering
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Filters
        characters={characters}
        filteredCharacters={filteredCharacters}
        setFilteredCharacters={setFilteredCharacters}
      />
      <CharacterGrid characters={filteredCharacters} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
