import type { TasksRepository } from "@/repositories/tasks-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface DeleteTaskUseCaseRequest {
	publicId: string;
}

export class DeleteTaskUseCase {
	constructor(private tasksRepository: TasksRepository) {}

	async execute({ publicId }: DeleteTaskUseCaseRequest): Promise<void> {
		const task = await this.tasksRepository.findById(publicId);

		if (!task) {
			throw new ResourceNotFoundError();
		}

		await this.tasksRepository.delete(publicId);
	}
}
