import React from "react";
import logger from "../utils/logger";

type BoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component {
  state: BoundaryState;

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    logger.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
