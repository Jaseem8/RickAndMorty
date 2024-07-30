// File: src/components/NavigationBar.tsx

import React from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Define the keyframes for the wave effect
const waveAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: color 0.3s, background-color 0.3s;

  &:hover::before {
    animation: ${waveAnimation} 1s ease-out;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    z-index: 0;
    pointer-events: none;
  }

  &.active {
    background-color: #007bff;
    color: white;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    background-color: #555;
    color: #1eac23;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  position: sticky;
  top: 0px;
  z-index: 2;
  justify-content: space-around;
  padding: 10px;
  background-color: #333;
  color: white;
`;

const NavigationBar: React.FC = () => {
  return (
    <NavContainer>
      <StyledNavLink to="/" end>
        <span>Home</span>
      </StyledNavLink>
      <StyledNavLink to="/locations">
        <span>Locations</span>
      </StyledNavLink>
      <StyledNavLink to="/episodes">
        <span>Episodes</span>
      </StyledNavLink>
    </NavContainer>
  );
};

export default NavigationBar;
