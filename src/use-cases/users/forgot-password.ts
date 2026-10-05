import { randomBytes } from "node:crypto";
import type { User } from "@/@types/prisma/client.js";
import { emailSchema } from "@/http/schemas/utils/email.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { UserNotFoundForPasswordResetError } from "@/use-cases/errors/user-not-found-for-password-reset-error.js";

interface ForgotPasswordUseCaseRequest {
	login: string;
}

type ForgotPasswordUseCaseResponse = {
	user: User;
	token: string;
};

const EXPIRES_IN_MINUTES = 15;
const TOKEN_LENGTH = 32;

export class ForgotPasswordUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		login,
	}: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
		const userExists = emailSchema.safeParse(login).success
			? await this.usersRepository.findByEmail(login)
			: await this.usersRepository.findByUsername(login);

		if (!userExists) throw new UserNotFoundForPasswordResetError();

		const token = randomBytes(TOKEN_LENGTH).toString("hex");
		const tokenExpiresAt = new Date(
			Date.now() + EXPIRES_IN_MINUTES * 60 * 1000,
		);

		const user = await this.usersRepository.update(userExists.publicId, {
			token,
			tokenExpiresAt,
		});

		if (!user) throw new UserNotFoundForPasswordResetError();

		return { user, token };
	}
}
