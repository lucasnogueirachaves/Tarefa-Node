import type { FastifyInstance } from "fastify";
import { registerProject } from "./register-projects.controller.js";
import { listProject } from "./list-projects.controller.js";


export async function projectsRoutes(app: FastifyInstance) {
    app.post('/', registerProject)
    app.get('/', listProject)
}