import { PrismaProjectRepository } from "@/repositories/prisma/projects-prisma-repository.js"
import { PrismaTasksRepository } from "@/repositories/prisma/tasks-prisma-repository.js"

import { GetProjectTasksUseCase } from "../projects/get-project-tasks.js"


export function makeGetProjectTasksUseCase() {
    const projectsRepository = new PrismaProjectRepository()
    const tasksRepository = new PrismaTasksRepository()
    const getProjectTasksUseCase = new GetProjectTasksUseCase(projectsRepository, tasksRepository)


    return getProjectTasksUseCase
}