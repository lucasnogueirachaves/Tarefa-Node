import { PrismaProjectRepository } from "@/repositories/prisma/projects-prisma-repository.js";
import { DeleteProjectUseCase } from "../projects/delete-project.js";

export function makeDeleteProjectUseCase() {
	const projectsRepository = new PrismaProjectRepository();
	const deleteProjectUseCase = new DeleteProjectUseCase(projectsRepository);

	return deleteProjectUseCase;
}
