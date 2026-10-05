import type { Project } from "@/@types/prisma/client.js";
import {
	PROJECTS_LIST_CACHE_KEY,
	PROJECTS_LIST_CACHE_TTL_SECONDS,
	redis,
} from "@/libs/redis.js";
import type { ProjectsRepository } from "@/repositories/projects-repository.js";

export class ListProjectsUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute(): Promise<Project[]> {
		try {
			const cached = await redis.get(PROJECTS_LIST_CACHE_KEY);

			if (cached) {
				console.info(`[cache] HIT ${PROJECTS_LIST_CACHE_KEY}`);
				return JSON.parse(cached) as Project[];
			}
		} catch (error) {
			console.error("[cache] falha ao ler do Redis, usando o banco:", error);
		}

		console.info(`[cache] MISS ${PROJECTS_LIST_CACHE_KEY}`);
		const projects = await this.projectsRepository.findMany();

		try {
			await redis.set(
				PROJECTS_LIST_CACHE_KEY,
				JSON.stringify(projects),
				"EX",
				PROJECTS_LIST_CACHE_TTL_SECONDS,
			);
		} catch (error) {
			console.error("[cache] falha ao gravar no Redis:", error);
		}

		return projects;
	}
}
