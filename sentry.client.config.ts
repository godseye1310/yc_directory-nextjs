// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
	Sentry.init({
		dsn: "https://3b8e3f66e374d96a8d7426616353a739@o4508214109011968.ingest.de.sentry.io/4508214125920336",

		// Add optional integrations for additional features
		// integrations: [Sentry.replayIntegration()],// commented out for now

		// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
		tracesSampleRate: 0.1,

		// Define how likely Replay events are sampled.
		// This sets the sample rate to be 10%. You may want this to be 100% while
		// in development and sample at a lower rate in production
		replaysSessionSampleRate: 0.01,

		// Define how likely Replay events are sampled when an error occurs.
		replaysOnErrorSampleRate: 0.1,

		// Setting this option to true will print useful information to the console while you're setting up Sentry.
		debug: false,

		denyUrls: [
			/localhost:3000\/studio/, // Ignores all errors on the /studio route
			/sanity\.io/, // Ignores WebSocket errors from Sanity
		],
		ignoreErrors: [
			"WebSocket is closed before the connection is established.",
			"WebSocket connection failed", // Add any WebSocket error messages you see
		],
		beforeSend(event) {
			// Filter out WebSocket errors more specifically if needed
			if (event.message && event.message.includes("WebSocket")) {
				return null; // Ignore WebSocket-related errors
			}
			return event;
		},
	});
}
