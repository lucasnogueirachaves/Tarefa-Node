import type { Task } from "@/@types/prisma/client.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";

export interface GetTaskFilterUseCaseRequest {
    priority?: TaskPriority
    completed?: boolean
}

type GetTaskUseCaseResponse = {
    tasks: Task[]
}

export class GetTaskFilterUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute(filters: GetTaskFilterUseCaseRequest): Promise<GetTaskUseCaseResponse> {
        const tasks = await this.tasksRepository.findMany(filters)

        if (!tasks) {
            throw new ResourceNotFoundError()
        }

        return {tasks}
    }
}