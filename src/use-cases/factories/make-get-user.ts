import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { GetUserUseCase } from "../users/get-user.js";

export function makeGetUserUseCase() {
	const usersRepository = new PrismaUserRepository();
	const getUserUserUseCase = new GetUserUseCase(usersRepository);

	return getUserUserUseCase;
}
