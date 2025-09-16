import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import "./i18n";
import * as Sentry from "@sentry/react";
import config from "./config";

Sentry.init({
  dsn: config.sentry.dsn,
  environment: config.sentry.environment,
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});

// Render the application
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(<App />);
