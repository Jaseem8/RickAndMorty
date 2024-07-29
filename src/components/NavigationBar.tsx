// File: src/components/NavigationBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #333;
  color: white;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  &:hover {
    background-color: #555;
    border-radius: 4px;
  }
`;

const NavigationBar: React.FC = () => {
  return (
    <NavContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/locations">Locations</NavLink>
      <NavLink to="/episodes">Episodes</NavLink>
    </NavContainer>
  );
};

export default NavigationBar;
