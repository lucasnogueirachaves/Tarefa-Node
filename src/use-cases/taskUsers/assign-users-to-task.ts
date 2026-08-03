import type { TasksRepository } from "@/repositories/tasks-repository.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import type { TaskUsersRepository } from "@/repositories/task-users-repository.js"

import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"


interface AssignUsersToTaskUseCaseRequest {
    taskPublicId: string
    userPublicIds: string[]
}

export class AssignUsersToTaskUseCase {
    constructor(private tasksRepository: TasksRepository, private usersRepository: UsersRepository, private taskUsersRepository: TaskUsersRepository) {}

    async execute({
        taskPublicId,
        userPublicIds
    }: AssignUsersToTaskUseCaseRequest) {

        const task = await this.tasksRepository.findById(
            taskPublicId
        )

        if (!task) {
            throw new ResourceNotFoundError()
        }

        const users = await this.usersRepository.findManyByPublicId(userPublicIds)

        if (users.length !== userPublicIds.length) {
            throw new ResourceNotFoundError()
        }

        await this.taskUsersRepository.createMany(
            users.map(user => ({
                taskId: task.id,
                userId: user.id
            }))
        )
    }
}