import type { User } from "@/@types/prisma/client.js";
import type { HashProvider } from "@/providers/hash-provider.js";
import type { TokenProvider } from "@/providers/token-provider.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.js";

interface AuthenticateUserUseCaseRequest {
	email: string;
	password: string;
}

type AuthenticateUserUseCaseResponse = {
	user: User;
	token: string;
};

export class AuthenticateUserUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private hashProvider: HashProvider,
		private tokenProvider: TokenProvider,
	) {}

	async execute({
		email,
		password,
	}: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await this.hashProvider.compare(
			password,
			user.passwordHash,
		);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		const token = await this.tokenProvider.generate({
			sub: user.publicId,
			role: user.role,
		});

		return { user, token };
	}
}
