import type { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { UsersRepository } from "../users-repository.js";

export class PrismaUserRepository implements UsersRepository {
	async create(data: Prisma.UserCreateInput) {
		return await prisma.user.create({ data });
	}
	async findMany() {
		return prisma.user.findMany({
			include: {
				taskUsers: {
					include: {
						task: true,
					},
				},
			},
		});
	}
	async findByEmail(email: string) {
		return prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
	async findManyByPublicId(publicIds: string[]) {
		return await prisma.user.findMany({
			where: {
				publicId: {
					in: publicIds,
				},
			},
		});
	}
	async findById(publicId: string) {
		return prisma.user.findUnique({
			where: {
				publicId,
			},
			include: {
				taskUsers: {
					include: {
						task: true,
					},
				},
			},
		});
	}
	async update(publicId: string, data: Prisma.UserUpdateInput) {
		return await prisma.user.update({
			where: { publicId },
			data,
		});
	}
	async delete(publicId: string) {
		await prisma.user.delete({
			where: {
				publicId,
			},
		});
	}
}
