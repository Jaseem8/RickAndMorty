// File: src/pages/HomePage.tsx
import React, { useState, useEffect } from "react";
import CharacterGrid from "../components/CharacterGrid";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { getCharacters, searchCharacters } from "../services/api";
import Pagination from "../components/Pagination";
import Layout from "../components/Layout";

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
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
        setFilteredCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
        // console.log("totalPages", response.data.info.pages);
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
    };

    fetchData();
  }, [page, searchQuery]);

  const handlePageChange = (newPage: number) => {
    console.log("number", newPage);

    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
  };

  // const handleFilterChange = (newFilteredCharacters: any) => {
  //   setFilteredCharacters(newFilteredCharacters);
  //   setPage(1); // Reset to first page when filtering
  // };

  return (
    <Layout>
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
    </Layout>
  );
};

export default HomePage;
