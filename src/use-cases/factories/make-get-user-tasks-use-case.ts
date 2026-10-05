import { PrismaTasksRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";

import { GetUserTasksUseCase } from "../users/get-user-tasks.js";

export function makeGetUserTasksUseCase() {
	const usersRepository = new PrismaUserRepository();
	const tasksRepository = new PrismaTasksRepository();

	return new GetUserTasksUseCase(usersRepository, tasksRepository);
}
