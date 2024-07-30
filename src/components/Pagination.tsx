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
const PageButton = styled.button<{ $isActive: boolean }>`
  margin: 0 5px;
  padding: 10px 15px;
  background-color: ${(props) =>
    props.$isActive
      ? "#007bff"
      : "#f8f9fa"}; /* Blue for active, light gray for others */
  color: ${(props) =>
    props.$isActive
      ? "#fff"
      : "#007bff"}; /* White for active text, blue for others */
  border: 1px solid ${(props) => (props.$isActive ? "#007bff" : "#ced4da")}; /* Blue border for active, gray for others */
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isActive
        ? "#0056b3"
        : "#e2e6ea"}; /* Light gray for non-active on hover */
    color: ${(props) => (props.$isActive ? "#fff" : "#007bff")};
    transform: ${(props) =>
      props.$isActive ? "scale(1.05)" : "none"}; /* Slight scale for active */
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
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => (
        <PageButton
          key={number}
          onClick={() => onPageChange(number)}
          $isActive={number === currentPage}
        >
          {number}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
