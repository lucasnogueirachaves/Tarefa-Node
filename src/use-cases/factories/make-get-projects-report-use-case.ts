import { PrismaProjectRepository } from "@/repositories/prisma/projects-prisma-repository.js";
import { GetProjectsReportUseCase } from "../report/get-projects-report.js";

export function makeGetProjectsReportUseCase() {
	const projectsRepository = new PrismaProjectRepository();

	return new GetProjectsReportUseCase(projectsRepository);
}
