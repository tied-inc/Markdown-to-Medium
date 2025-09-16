type Config = {
  environment: string;
  gtm: string;
  sentry: {
    org: string;
    project: string;
    authToken: string;
    dsn: string;
    environment: string;
  };

  // methods
  isDevelopment: () => boolean;
};

const config: Config = {
  // Environment
  environment: process.env.NODE_ENV || "development",

  // Google Tag Manager
  gtm: process.env.VITE_GTM_ID || "GTM-XXXXXXX",

  // Sentry
  sentry: {
    org: process.env.VITE_SENTRY_ORG || "",
    project: process.env.VITE_SENTRY_PROJECT || "m2m",
    authToken: process.env.SENTRY_AUTH_TOKEN || "",
    dsn: process.env.VITE_SENTRY_DSN || "",
    environment: process.env.VITE_SENTRY_ENVIRONMENT || "development",
  },

  isDevelopment: () => process.env.NODE_ENV === "development",
};

export default config;
