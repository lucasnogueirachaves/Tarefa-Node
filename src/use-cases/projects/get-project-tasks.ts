import type { Task } from "@/@types/prisma/client.js";
import type { ProjectsRepository } from "@/repositories/projects-repository.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface GetProjectTasksUseCaseRequest {
	projectPublicId: string;
}

interface GetProjectTasksUseCaseResponse {
	tasks: Task[];
}

export class GetProjectTasksUseCase {
	constructor(
		private projectsRepository: ProjectsRepository,
		private tasksRepository: TasksRepository,
	) {}

	async execute({
		projectPublicId,
	}: GetProjectTasksUseCaseRequest): Promise<GetProjectTasksUseCaseResponse> {
		const project = await this.projectsRepository.findById(projectPublicId);

		if (!project) {
			throw new ResourceNotFoundError();
		}

		const tasks = await this.tasksRepository.findManyByProject(project.id);

		return { tasks };
	}
}
