import React from "react";
import styled from "styled-components";
// Styled container for pagination buttons
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap; // Ensure it wraps on smaller screens
`;

// Styled button for pagination
const PageButton = styled.button.attrs<{ active: boolean }>({
  // Filter out the active attribute to avoid passing it to the DOM
  active: undefined,
})<{ active: boolean }>`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: ${(props) =>
    props.active ? "#28a745" : "#f8f9fa"}; /* Green for active */
  color: ${(props) => (props.active ? "#fff" : "#28a745")};
  border: 1px solid ${(props) => (props.active ? "#28a745" : "#ced4da")};
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.active
        ? "#218838"
        : "#e2e6ea"}; /* Darker green on hover for active */
    color: ${(props) => (props.active ? "#fff" : "#218838")};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 8px 12px;
  }
`;

// Define interface for pagination props
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
