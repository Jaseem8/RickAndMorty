import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Filters: React.FC = () => {
  return (
    <FilterContainer>{/* Your filter components go here */}</FilterContainer>
  );
};

export default Filters;
