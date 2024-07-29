// File: src/components/Pagination.tsx

import React from "react";
import styled from "styled-components";

// Styled container for pagination buttons
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// Styled button for pagination
const PageButton = styled.button<{ active: boolean }>`
  margin: 0 5px;
  padding: 10px;
  background-color: ${(props) => (props.active ? "blue" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid black;
  cursor: pointer;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Pagination component to handle page navigation
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  // Generate page numbers based on total pages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => (
        <PageButton
          key={number}
          onClick={() => onPageChange(number)}
          active={number === currentPage}
        >
          {number}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
