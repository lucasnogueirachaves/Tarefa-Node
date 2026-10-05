import type { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { ProjectsRepository } from "../projects-repository.js";

export class PrismaProjectRepository implements ProjectsRepository {
	async create(data: Prisma.ProjectCreateInput) {
		return await prisma.project.create({ data });
	}
	async findMany() {
		return await prisma.project.findMany();
	}
	async findById(publicId: string) {
		return await prisma.project.findUnique({
			where: {
				publicId,
			},
			include: {
				tasks: true,
			},
		});
	}
	async update(publicId: string, data: Prisma.ProjectUpdateInput) {
		return await prisma.project.update({
			where: { publicId },
			data,
		});
	}
	async delete(publicId: string) {
		await prisma.project.delete({
			where: {
				publicId,
			},
		});
	}
	async findManyWithTasks() {
		return await prisma.project.findMany({
			include: {
				tasks: true,
			},
		});
	}
}
