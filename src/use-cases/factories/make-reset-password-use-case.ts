import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { ResetPasswordUseCase } from "@/use-cases/users/reset-password.js";

export function makeResetPasswordUseCase() {
	const usersRepository = new PrismaUserRepository();
	const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository);

	return resetPasswordUseCase;
}
