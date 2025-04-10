import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://e827b6d6075f4eef1839bf0603e90459@o4508457956278272.ingest.us.sentry.io/4508832677298176",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
