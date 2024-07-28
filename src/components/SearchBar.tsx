import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 8px;
  font-size: 16px;
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for characters"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </SearchContainer>
  );
};

export default SearchBar;
