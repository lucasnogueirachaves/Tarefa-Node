import type { Task } from "@/@types/prisma/client.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface GetUserTasksUseCaseRequest {
	userPublicId: string;
}

interface GetUserTasksUseCaseResponse {
	tasks: Task[];
}

export class GetUserTasksUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private tasksRepository: TasksRepository,
	) {}

	async execute({
		userPublicId,
	}: GetUserTasksUseCaseRequest): Promise<GetUserTasksUseCaseResponse> {
		const user = await this.usersRepository.findById(userPublicId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const tasks = await this.tasksRepository.findManyByUser(user.id);

		return { tasks };
	}
}
