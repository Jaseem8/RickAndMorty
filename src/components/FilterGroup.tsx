// File: src/components/FilterGroup.tsx

import React from "react";
import styled from "styled-components";

const FilterGroupContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(to bottom, #fff, #f9f9f9);

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    outline: none;
  }
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  /* Adjust based on the height of the FilterSelect */
  z-index: 2;
  top: 8px;
  width: 100%;
  max-height: 100%;
  justify-content: center;
`;

const Chip = styled.div`
  padding: 6px 12px;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #e0e0e0, #c0c0c0);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ChipCloseButton = styled.span`
  cursor: pointer;
  font-size: 12px;
  color: #ffffff;
  background: linear-gradient(135deg, #ff5c5c, #cb2727);
  border-radius: 50%;
  border: 1px solid #ff0000;
  padding: 2px 6px;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #e04e4e, #b82424);
    transform: scale(1.2);
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
