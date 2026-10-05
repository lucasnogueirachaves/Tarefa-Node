import { app } from "./app.js";
import { env } from "./env/index.js";
import { startJobs } from "./jobs/index.js";

app.listen({ host: "0.0.0.0", port: env.APP_PORT }).then(() => {
	console.log(`HTTP Server Running at http://localhost:${env.APP_PORT}`);
	startJobs();
});
