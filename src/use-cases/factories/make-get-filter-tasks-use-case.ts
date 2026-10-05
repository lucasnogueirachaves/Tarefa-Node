import { GetTaskFilterUseCase } from "@/use-cases/tasks/get-task-filtro.js";
import { PrismaTasksRepository } from "../../repositories/prisma/tasks-prisma-repository.js";

export function makeGetTaskFilterUseCase() {
	const tasksRepository = new PrismaTasksRepository();
	const getTaskFilterUseCase = new GetTaskFilterUseCase(tasksRepository);

	return getTaskFilterUseCase;
}
