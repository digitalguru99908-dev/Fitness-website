import app from "./app";
import { logger } from "./lib/logger";

// On Replit, PORT is injected by the artifact system.
// Locally, fall back to 8080 so the server starts without any setup.
const rawPort = process.env["PORT"] ?? "8080";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
