import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

function ProblemChild() {
  throw new Error("Error thrown from problem child");
  return <div>Error</div>; // eslint-disable-line
}

describe("Test ErrorBoundary", () => {
  it("renders ErrorBoundary's children", () => {
    render(
      <ErrorBoundary>
        <div>content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders error message when error is thrown in the children", () => {
    console.error = jest.fn();
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(console.error).toBeCalled();
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });
});
