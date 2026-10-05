import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";
import { getProjectsReport } from "./get-projects-report.controller.js";

export async function reportRoutes(app: FastifyInstance) {
	app.get(
		"/projects",
		{ onRequest: [verifyJwt, verifyUserRole(["ADMIN"])] },
		getProjectsReport,
	);
}
