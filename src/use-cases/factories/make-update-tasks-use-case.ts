import { PrismaTasksRepository } from "@/repositories/prisma/tasks-prisma-repository.js"
import { UpdateTaskUseCase } from "../tasks/update-task.js"


export function makeUpdateTaskUseCase(){

    const tasksRepository = new PrismaTasksRepository()
    const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository)

    return updateTaskUseCase

}