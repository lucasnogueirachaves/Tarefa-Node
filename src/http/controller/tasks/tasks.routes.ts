import { type FastifyInstance } from 'fastify';
import { getTaskFilter } from './get-filter-task.controller.js';
import { getTask } from './get-task.controller.js';

export async function tasksRoutes(app: FastifyInstance) {
    app.get('/', getTaskFilter)
    app.get('/:publicId', getTask)
}