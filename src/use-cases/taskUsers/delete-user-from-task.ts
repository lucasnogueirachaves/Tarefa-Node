import type { TaskUsersRepository } from "@/repositories/task-users-repository.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface DeleteUserFromTaskUseCaseRequest {
	taskPublicId: string;
	userPublicId: string;
}

export class DeleteUserFromTaskUseCase {
	constructor(
		private tasksRepository: TasksRepository,
		private usersRepository: UsersRepository,
		private taskUsersRepository: TaskUsersRepository,
	) {}

	async execute({
		taskPublicId,
		userPublicId,
	}: DeleteUserFromTaskUseCaseRequest) {
		const task = await this.tasksRepository.findById(taskPublicId);

		if (!task) {
			throw new ResourceNotFoundError();
		}

		const user = await this.usersRepository.findById(userPublicId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		await this.taskUsersRepository.delete(task.id, user.id);
	}
}
