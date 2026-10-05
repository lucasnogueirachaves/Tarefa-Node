import { PrismaTaskUsersRepository } from "@/repositories/prisma/task-users-prisma-repository.js";
import { PrismaTasksRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { AssignUsersToTaskUseCase } from "../taskUsers/assign-users-to-task.js";

export function makeAssignUsersToTaskUseCase() {
	const tasksRepository = new PrismaTasksRepository();
	const usersRepository = new PrismaUserRepository();
	const taskUsersRepository = new PrismaTaskUsersRepository();

	return new AssignUsersToTaskUseCase(
		tasksRepository,
		usersRepository,
		taskUsersRepository,
	);
}
