import type { Project, ProjectStatus } from "@/@types/prisma/client.js"
import type { ProjectsRepository } from "@/repositories/projects-repository.js"

interface RegisterProjectUseCaseRequest {
    name: string,
    description?: string,
    status?: ProjectStatus
}

type RegisterProjectUseCaseResponse = {
    project: Project
}

export class RegisterProjectUseCase {
    constructor(private projectsRepository: ProjectsRepository) {}
    async execute({
        name,
        description,
        status
    }: RegisterProjectUseCaseRequest): Promise<RegisterProjectUseCaseResponse> {
        const project = await this.projectsRepository.create({
            name,
            description: description ?? null,
            ...(status ? { status } : {})
        })

        return {project}
        }
}