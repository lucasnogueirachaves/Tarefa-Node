import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { AuthenticateUserUseCase } from "../users/authenticate.js";

export function makeAuthenticateUseCase() {
	const usersRepository = new PrismaUserRepository();
	const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

	return authenticateUserUseCase;
}
