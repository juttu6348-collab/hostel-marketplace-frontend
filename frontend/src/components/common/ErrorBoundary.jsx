import { Component } from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "HostelHub application error:",
      error,
      errorInfo,
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReturnHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary-page">
          <section className="error-boundary-card">
            <div
              className="error-boundary-icon"
              aria-hidden="true"
            >
              !
            </div>

            <span className="section-eyebrow">
              Application error
            </span>

            <h1>Something went wrong</h1>

            <p>
              HostelHub encountered an unexpected error.
              Your saved demonstration data should remain
              available.
            </p>

            <div className="error-boundary-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleReload}
              >
                Reload Application
              </button>

              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.handleReturnHome}
              >
                Return Home
              </button>
            </div>

            {import.meta.env.DEV &&
              this.state.error && (
                <details className="error-boundary-details">
                  <summary>
                    Development error details
                  </summary>

                  <pre>
                    {this.state.error.message}
                  </pre>
                </details>
              )}
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;