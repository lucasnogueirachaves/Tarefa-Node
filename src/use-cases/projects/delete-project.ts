import type { ProjectsRepository } from "@/repositories/projects-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface DeleteProjectUseCaseRequest {
    publicId: string
}

export class DeleteProjectUseCase {
    constructor(private projectsRepository: ProjectsRepository) {}

    async execute({ publicId }: DeleteProjectUseCaseRequest): Promise<void> {
        const project = await this.projectsRepository.findById(publicId)

        if (!project) {
            throw new ResourceNotFoundError()
        }

        await this.projectsRepository.delete(project.publicId)
    }
}