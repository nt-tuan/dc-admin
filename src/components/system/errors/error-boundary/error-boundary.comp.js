import React from "react";
import { log } from "utils/logger.util";
import { message } from "antd";
import * as Sentry from "@sentry/browser";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    if (process.env.NODE_ENV !== "production") {
      console.group("Component Error");
      log(error);
      log(errorInfo);
      console.groupEnd();
    } else {
      Sentry.withScope((scope) => {
        scope.setExtras({ "Component Error": errorInfo });
        Sentry.captureException(error);
      });
    }
  }

  render() {
    if (this.state.hasError) {
      message.error("Something went wrong, please press F5 to refresh the page", 0);
    }

    return this.props.children;
  }
}
