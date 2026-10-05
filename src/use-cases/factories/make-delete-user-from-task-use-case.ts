import { PrismaTaskUsersRepository } from "@/repositories/prisma/task-users-prisma-repository.js";
import { PrismaTasksRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { DeleteUserFromTaskUseCase } from "../taskUsers/delete-user-from-task.js";

export function makeDeleteUserFromTaskUseCase() {
	const tasksRepository = new PrismaTasksRepository();
	const usersRepository = new PrismaUserRepository();
	const taskUsersRepository = new PrismaTaskUsersRepository();

	return new DeleteUserFromTaskUseCase(
		tasksRepository,
		usersRepository,
		taskUsersRepository,
	);
}
