import { hash } from "bcryptjs";
import type { User } from "@/@types/prisma/client.js";
import { env } from "@/env/index.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js";

interface RegisterUserUseCaseRequest {
	name: string;
	username: string;
	email: string;
	cpf: string;
	password: string;
}

type RegisterUserUseCaseResponse = {
	user: User;
};

export class RegisterUserUseCase {
	constructor(private usersRepository: UsersRepository) {}
	async execute({
		name,
		username,
		email,
		cpf,
		password,
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const passwordHash = await hash(password, env.HASH_SALT_ROUNDS);

		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const user = await this.usersRepository.create({
			name,
			username,
			email,
			cpf,
			passwordHash,
		});

		return { user };
	}
}
