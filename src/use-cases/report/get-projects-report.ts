import type { ProjectsRepository } from "@/repositories/projects-repository.js";

export class GetProjectsReportUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute() {
		const projects = await this.projectsRepository.findManyWithTasks();
		return projects.map((project) => {
			const totalTasks = project.tasks.length;

			const completedTasks = project.tasks.filter(
				(task) => task.completed,
			).length;

			const completionPercentage =
				totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

			return {
				projectId: project.publicId,
				name: project.name,
				totalTasks,
				completedTasks,
				completionPercentage,
			};
		});
	}
}
