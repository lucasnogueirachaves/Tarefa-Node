import { GetProjectUseCase } from "@/use-cases/projects/get-project.js";
import { PrismaProjectRepository } from "../../repositories/prisma/projects-prisma-repository.js";

export function makeGetProjectUseCase() {
	const projectsRepository = new PrismaProjectRepository();
	const getProjectUseCase = new GetProjectUseCase(projectsRepository);

	return getProjectUseCase;
}
