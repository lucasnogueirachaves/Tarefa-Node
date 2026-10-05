import { PrismaProjectRepository } from "@/repositories/prisma/projects-prisma-repository.js";
import { PrismaTasksRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { RegisterTaskUseCase } from "../tasks/register-task.js";

export function makeRegisterTaskUseCase() {
	const tasksRepository = new PrismaTasksRepository();

	const projectsRepository = new PrismaProjectRepository();

	const registerTaskUseCase = new RegisterTaskUseCase(
		tasksRepository,
		projectsRepository,
	);

	return registerTaskUseCase;
}
