import type { Task } from "@/@types/prisma/client.js"
import type { TasksRepository } from "@/repositories/tasks-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"


interface CompleteTaskUseCaseRequest {
    publicId: string
}


interface CompleteTaskUseCaseResponse {
    task: Task
}

export class CompleteTaskUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({
        publicId
    }: CompleteTaskUseCaseRequest): Promise<CompleteTaskUseCaseResponse> {

        const taskExists = await this.tasksRepository.findById(publicId)

        if (!taskExists) {
            throw new ResourceNotFoundError()
        }

        const task = await this.tasksRepository.update(
            publicId,
            {
                completed: true
            }
        )

        return { task }
    }
}