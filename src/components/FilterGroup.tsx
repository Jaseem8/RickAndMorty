// File: src/components/FilterGroup.tsx

import React from "react";
import styled from "styled-components";

const FilterGroupContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const FilterSelect = styled.select`
  padding: 8px;
  margin-top: 8px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  position: absolute;
  z-index: 1;
  bottom: 0;
  width: 100%;
  justify-content: center;
`;

const Chip = styled.div`
  padding: 4px 8px;
  background-color: #e0e0e0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1px;
  margin-bottom: 1px;
`;

const ChipCloseButton = styled.span`
  cursor: pointer;
  font-size: 10px;
  color: #000000;
  background-color: #cb2727;
  opacity: 0.5;
  border-radius: 50%;
  border: 1px solid red;
  &:hover {
    transform: scale(1.1);
  }
`;

interface FilterGroupProps {
  filterName: string;
  filterValues: string[];
  uniqueValues: string[];
  handleFilterChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    filterName: string
  ) => void;
  handleRemoveFilterValue: (filterName: string, value: string) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  filterName,
  filterValues,
  uniqueValues,
  handleFilterChange,
  handleRemoveFilterValue,
}) => {
  return (
    <FilterGroupContainer>
      <ChipContainer>
        {filterValues.map((value) => (
          <Chip key={value}>
            {value}
            <ChipCloseButton
              onClick={() => handleRemoveFilterValue(filterName, value)}
            >
              &times;
            </ChipCloseButton>
          </Chip>
        ))}
      </ChipContainer>
      <FilterSelect
        name={filterName}
        value=""
        onChange={(e) => handleFilterChange(e, filterName)}
        disabled={filterValues.length > 0}
      >
        <option value="">
          Select {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
        </option>
        {uniqueValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </FilterSelect>
    </FilterGroupContainer>
  );
};

export default FilterGroup;
