import type { FastifyInstance } from "fastify";
import { registerProject } from "./register-projects.controller.js";
import { listProject } from "./list-projects.controller.js";
import { getProject } from "./get-project.controller.js";
import { updateProject } from "./update-project.controller.js";
import { deleteProject } from "./delete-project.controller.js";
import { getProjectTasks } from "./get-project-tasks.controller.js";


export async function projectsRoutes(app: FastifyInstance) {
    app.post('/', registerProject)
    app.get('/', listProject)
    app.get('/:publicId', getProject)
    app.put('/:publicId', updateProject)
    app.delete('/:publicId', deleteProject)
    app.get('/:publicId/tasks', getProjectTasks)
}