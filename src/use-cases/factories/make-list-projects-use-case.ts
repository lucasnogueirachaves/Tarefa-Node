import { PrismaProjectRepository } from '../../repositories/prisma/projects-prisma-repository.js'
import { ListProjectsUseCase } from '../projects/list-projects.js'

export function makeListProjectUseCase() {
    const projectsRepository = new PrismaProjectRepository()
    const listProjectUseCase = new ListProjectsUseCase(projectsRepository)

    return listProjectUseCase
}