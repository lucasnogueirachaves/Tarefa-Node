import type { ProjectsRepository } from "@/repositories/projects-repository.js";

export class ListProjectsUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute() {
		const projects = await this.projectsRepository.findMany();

		return projects;
	}
}
