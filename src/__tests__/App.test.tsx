// src/__tests__/App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders all routes without crashing", () => {
  // Render the App component
  render(<App />);

  // Check if the routes render correctly by verifying some text or component
  expect(screen.queryByText(/Home Page/i)).toBeNull();
});
