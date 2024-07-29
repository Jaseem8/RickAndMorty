// File: src/components/SearchBar.tsx

import React, { useState } from "react";
import styled from "styled-components";

// Styled container for search bar
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px auto;
  padding: 10px;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  background-color: #f1f1f1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:focus-within {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// Styled input for search bar
const SearchInput = styled.input`
  padding: 12px 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  ::placeholder {
    color: #aaa;
  }

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
}

// SearchBar component to handle search input and trigger search action
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search action on input change
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for characters..."
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
