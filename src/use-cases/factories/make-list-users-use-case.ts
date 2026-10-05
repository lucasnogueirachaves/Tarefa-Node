import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { ListUsersUseCase } from "../users/list-users.js";

export function makeListUsersUseCase() {
	const usersRepository = new PrismaUserRepository();
	const listUsersUserUseCase = new ListUsersUseCase(usersRepository);

	return listUsersUserUseCase;
}
