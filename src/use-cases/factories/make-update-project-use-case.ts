import { PrismaProjectRepository } from "../../repositories/prisma/projects-prisma-repository.js";
import { UpdateProjectUseCase } from "../projects/update-project.js";

export function makeUpdateProjectUseCase() {
	const projectsRepository = new PrismaProjectRepository();
	const updateProjectUseCase = new UpdateProjectUseCase(projectsRepository);

	return updateProjectUseCase;
}
