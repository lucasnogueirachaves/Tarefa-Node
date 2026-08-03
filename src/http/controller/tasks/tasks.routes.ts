import { type FastifyInstance } from 'fastify';
import { getTaskFilter } from './get-filter-task.controller.js';
import { getTask } from './get-task.controller.js';
import { registerTask } from './register-task.controller.js';
import { updateTask } from './update-task.controller.js';
import { deleteProject } from '../projects/delete-project.controller.js';
import { completeTask } from './complete-task.controller.js';
import { assignUsers } from './assign-users.controller.js';

export async function tasksRoutes(app: FastifyInstance) {
    app.get('/', getTaskFilter)
    app.get('/:publicId', getTask)
    app.post('/', registerTask)
    app.put('/:publicId', updateTask)
    app.delete('/:publicId', deleteProject)
    app.patch('/:publicId/complete', completeTask)
    app.post('/:publicId/assign', assignUsers)
}