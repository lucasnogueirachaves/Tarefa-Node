import { PrismaProjectRepository } from "@/repositories/prisma/projects-prisma-repository.js";
import { RegisterProjectUseCase } from "@/use-cases/projects/register-project.js";

export function makeRegisterProjectUseCase() {
	const projectsRepository = new PrismaProjectRepository();
	const registerProjectUseCase = new RegisterProjectUseCase(projectsRepository);

	return registerProjectUseCase;
}
