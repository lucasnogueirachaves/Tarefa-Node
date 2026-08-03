import type { Task } from "@/@types/prisma/client.js"
import type { TasksRepository } from "@/repositories/tasks-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"
import { NotAllowedError } from "../errors/not-allowed-error.js"


interface CompleteTaskUseCaseRequest {
    publicId: string
    loggedUserId: string
}


interface CompleteTaskUseCaseResponse {
    task: Task
}

export class CompleteTaskUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({
        publicId,
        loggedUserId
    }: CompleteTaskUseCaseRequest): Promise<CompleteTaskUseCaseResponse> {

        const taskExists = await this.tasksRepository.findById(publicId)

        if (!taskExists) {
            throw new ResourceNotFoundError()
        }

        const isAssigned = taskExists.taskUsers.some(taskUser => taskUser.user.publicId === loggedUserId)

        if(!isAssigned) {
            throw new NotAllowedError()
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