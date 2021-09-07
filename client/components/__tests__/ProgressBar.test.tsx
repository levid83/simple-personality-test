import { render, screen } from "@testing-library/react";

import ProgressBar from "../ProgressBar";

describe("Test ProgressBar", () => {
  it("renders ProgressBar component", () => {
    render(<ProgressBar completed={99} />);
    expect(screen.getByText(/99/)).toBeInTheDocument();
  });
});
