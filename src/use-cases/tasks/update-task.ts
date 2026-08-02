import type { Task, TaskPriority } from "@/@types/prisma/client.js"
import type { TasksRepository } from "@/repositories/tasks-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"


interface UpdateTaskUseCaseRequest {
    publicId: string

    title?: string
    description?: string
    priority?: TaskPriority
    completed?: boolean
    deadline?: Date
}


interface UpdateTaskUseCaseResponse {
    task: Task
}


export class UpdateTaskUseCase {

    constructor(
        private tasksRepository: TasksRepository
    ) {}


    async execute({
        publicId,
        title,
        description,
        priority,
        completed,
        deadline
    }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {


        const taskToUpdate = await this.tasksRepository.findById(publicId)


        if (!taskToUpdate) {
            throw new ResourceNotFoundError()
        }


        const task = await this.tasksRepository.update(
            publicId,
            {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(priority !== undefined && { priority }),
                ...(completed !== undefined && { completed }),
                ...(deadline !== undefined && { deadline })
            }
        )
        return { task }

    }
}