import type { Task, TaskPriority } from "@/@types/prisma/client.js"
import type { ProjectsRepository } from "@/repositories/projects-repository.js"
import type { TasksRepository } from "@/repositories/tasks-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface RegisterTaskUseCaseRequest {
    title: string
    description?: string
    priority: TaskPriority
    deadline?: Date
    projectPublicId: string
}

type RegisterTaskUseCaseResponse = {
    task: Task
}

export class RegisterTaskUseCase {
    constructor(private tasksRepository: TasksRepository, private projectsRepository: ProjectsRepository) {}
    async execute({
        title,
        description,
        priority,
        deadline,
        projectPublicId
    }: RegisterTaskUseCaseRequest): Promise<RegisterTaskUseCaseResponse> {

        try{
            const project = await this.projectsRepository.findById(projectPublicId)

            if (!project) {
                throw new ResourceNotFoundError()
            }

            const task = await this.tasksRepository.create({
                title,
                description: description ?? null,
                priority,
                deadline: deadline ?? null,
                project: {
                    connect: {
                        id: project.id
                    }
                }
            })

            return { task }

        } catch(error) {
            throw error
        }
        }
}