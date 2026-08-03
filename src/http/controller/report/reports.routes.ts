import { type FastifyInstance } from 'fastify';
import { getProjectsReport } from './get-projects-report.controller.js';

export async function reportRoutes(app: FastifyInstance) {
    app.get('/projects', getProjectsReport)
}