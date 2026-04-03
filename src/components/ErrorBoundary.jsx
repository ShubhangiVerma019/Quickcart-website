import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    //state to track error
    this.state = { hasError: false };
  }

  //triggered when error happens
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  //optional: log error
  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  render() {
    //if error → show fallback UI
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>!!Something went wrong!!</h2>
          <p>Please try again later.</p>
        </div>
      );
    }

    //if no error → render children
    return this.props.children;
  }
}

export default ErrorBoundary;