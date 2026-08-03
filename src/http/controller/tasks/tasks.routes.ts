import { type FastifyInstance } from 'fastify';
import { getTaskFilter } from './get-filter-task.controller.js';
import { getTask } from './get-task.controller.js';
import { registerTask } from './register-task.controller.js';
import { updateTask } from './update-task.controller.js';
import { deleteProject } from '../projects/delete-project.controller.js';
import { completeTask } from './complete-task.controller.js';
import { assignUsers } from './assign-users.controller.js';
import { deleteUserFromTask } from './delete-user-from-task.controller.js';
import { verifyJwt } from "@/http/middlewares/verify-jwt.js"
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js"

export async function tasksRoutes(app: FastifyInstance) {
    app.get('/', {onRequest: [verifyJwt]}, getTaskFilter)
    app.get('/:publicId', {onRequest: [verifyJwt]}, getTask)
    app.post('/', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, registerTask)
    app.put('/:publicId', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, updateTask)
    app.delete('/:publicId', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, deleteProject)
    app.patch('/:publicId/complete', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, completeTask) // fazer para atribuido
    app.post('/:publicId/assign', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, assignUsers)
    app.delete('/:publicId/assign/:userId', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, deleteUserFromTask)
}