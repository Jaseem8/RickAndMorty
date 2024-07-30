// File: src/components/ResidentCard.tsx

import React from "react";
import styled from "styled-components";

const ResidentCardContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ResidentImage = styled.img`
  border-radius: 8px;
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ResidentName = styled.h4`
  margin: 0;
  font-size: 1.1em;
  color: #333;
  white-space: nowrap; /* Prevents the text from wrapping */
  overflow: hidden; /* Hides text that overflows */
  text-overflow: ellipsis; /* Adds ellipsis (...) when the text is clipped */
`;

interface Resident {
  id: number;
  name: string;
  image: string;
}

interface ResidentCardProps {
  resident: Resident;
  onClick: () => void;
}

const ResidentCard: React.FC<ResidentCardProps> = ({ resident, onClick }) => {
  return (
    <ResidentCardContainer onClick={onClick}>
      <ResidentImage src={resident.image} alt={resident.name} />
      <ResidentName>{resident.name}</ResidentName>
    </ResidentCardContainer>
  );
};

export default ResidentCard;
