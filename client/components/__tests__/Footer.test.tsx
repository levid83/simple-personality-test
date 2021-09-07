import { render, screen } from "@testing-library/react";

import Footer from "../Footer";

describe("Test Footer", () => {
  it("renders Footer component", () => {
    const { container } = render(<Footer />);
    expect(screen.getByText(/Made by/)).toBeInTheDocument();
  });
});
