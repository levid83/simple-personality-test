import { render, screen } from "@testing-library/react";

import Header from "../Header";

describe("Test Header", () => {
  it("renders Footer component", () => {
    render(<Header />);
    expect(screen.getByText(/Personality test/)).toBeInTheDocument();
  });
});
