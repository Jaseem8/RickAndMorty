import React, { useState } from "react";
import styled from "styled-components";

// Styled container for search bar
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 16px auto;
  padding: 10px;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  background-color: #f7f7f7; /* Light Neutral Background */
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
  border: 1px solid #ccc; /* Light Gray Border */
  border-radius: 8px;
  font-size: 1rem;
  color: #333; /* Dark Gray Text */
  background-color: #fff;
  transition: border-color 0.3s ease;
  padding-right: 40px; /* Space for clear button */

  &:focus {
    border-color: #999; /* Medium Gray Border on Focus */
    outline: none;
  }

  ::placeholder {
    color: #aaa;
  }

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

// Styled button for clearing the input
const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  border: none;
  background: none;
  cursor: pointer;
  color: #333; /* Dark Gray */
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #666; /* Medium Gray on Hover */
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

  // Clear search input
  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); // Trigger search with empty query
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
      {searchTerm && (
        <ClearButton onClick={handleClear} aria-label="Clear search">
          &times;
        </ClearButton>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
