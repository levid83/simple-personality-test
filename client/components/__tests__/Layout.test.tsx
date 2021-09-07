import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

describe("Test Layout", () => {
  it("renders Layout component", () => {
    render(<Layout>content</Layout>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
