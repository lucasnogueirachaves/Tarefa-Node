import { PrismaTasksRepository } from '../../repositories/prisma/tasks-prisma-repository.js'
import {GetTaskUseCase} from '@/use-cases/tasks/get-task.js'

export function makeGetTaskUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const getTaskUseCase = new GetTaskUseCase(tasksRepository)

    return getTaskUseCase
}