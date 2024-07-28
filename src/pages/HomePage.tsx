import React, { useState, useEffect } from "react";
import CharacterGrid from "../components/CharacterGrid";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { getCharacters, searchCharacters } from "../services/api";
import Pagination from "../components/Pagination";

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
    };

    fetchData();
  }, [page, searchQuery]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Filters />
      <CharacterGrid characters={characters} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
