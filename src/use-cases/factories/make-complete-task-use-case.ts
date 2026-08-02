import { PrismaTasksRepository } from "@/repositories/prisma/tasks-prisma-repository.js"
import { CompleteTaskUseCase } from "../tasks/complete-task.js"


export function makeCompleteTaskUseCase() {
    const tasksRepository = new PrismaTasksRepository()
    const completeTaskUseCase = new CompleteTaskUseCase(tasksRepository)

    return completeTaskUseCase
}