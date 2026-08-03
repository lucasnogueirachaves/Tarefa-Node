import type { FastifyInstance } from "fastify";
import { registerProject } from "./register-projects.controller.js";
import { listProject } from "./list-projects.controller.js";
import { getProject } from "./get-project.controller.js";
import { updateProject } from "./update-project.controller.js";
import { deleteProject } from "./delete-project.controller.js";
import { getProjectTasks } from "./get-project-tasks.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js"
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js"


export async function projectsRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, registerProject) //
    app.get('/', {onRequest: [verifyJwt]}, listProject) //
    app.get('/:publicId', {onRequest: [verifyJwt]}, getProject) //
    app.put('/:publicId', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, updateProject) //
    app.delete('/:publicId', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, deleteProject) //
    app.get('/:publicId/tasks', {onRequest: [verifyJwt]}, getProjectTasks) 
} 