import { PrismaTasksRepository } from '../../repositories/prisma/tasks-prisma-repository.js'
import { GetTaskFilterUseCase } from '@/use-cases/tasks/get-task-filtro.js'

export function makeGetTaskFilterUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const getTaskFilterUseCase = new GetTaskFilterUseCase(tasksRepository)

    return getTaskFilterUseCase
}