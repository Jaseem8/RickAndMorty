// File: src/components/NavigationBar.tsx

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #333;
  color: white;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
    color: #1eac23;
  }

  &.active {
    background-color: #007bff;
    color: white;
  }
`;

const NavigationBar: React.FC = () => {
  return (
    <NavContainer>
      <StyledNavLink to="/" end>
        Home
      </StyledNavLink>
      <StyledNavLink to="/locations">Locations</StyledNavLink>
      <StyledNavLink to="/episodes">Episodes</StyledNavLink>
    </NavContainer>
  );
};

export default NavigationBar;
