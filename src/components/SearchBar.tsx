// File: src/components/SearchBar.tsx

import React, { useState } from "react";
import styled from "styled-components";

// Styled container for search bar
const SearchContainer = styled.div`
  margin-bottom: 16px;
`;

// Styled input for search bar
const SearchInput = styled.input`
  padding: 8px;
  width: 100%;
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
}

// SearchBar component to handle search input and trigger search action
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search action on Enter key press
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for characters"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch();
        }}
      />
    </SearchContainer>
  );
};

export default SearchBar;
