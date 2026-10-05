import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { UpdateUserUseCase } from "../users/update.js";

export function makeUpdateUseCase() {
	const usersRepository = new PrismaUserRepository();
	const updateUserUseCase = new UpdateUserUseCase(usersRepository);

	return updateUserUseCase;
}
