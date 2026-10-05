import { describe, expect, it, vi } from "vitest";
import type { User } from "@/@types/prisma/client.js";
import type { HashProvider } from "@/providers/hash-provider.js";
import type { TokenProvider } from "@/providers/token-provider.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { AuthenticateUserUseCase } from "./authenticate.js";

const fakeUser: User = {
	id: 1,
	publicId: "0198f3a2-0000-7000-8000-000000000001",
	name: "Maria Silva",
	username: "maria",
	email: "maria@example.com",
	cpf: "12345678901",
	passwordHash: "hash-do-banco",
	loginAttempts: 0,
	lastLogin: null,
	role: "USER",
	token: null,
	tokenExpiresAt: null,
	createdAt: new Date("2026-01-01"),
	updatedAt: new Date("2026-01-01"),
	passwordChangedAt: null,
};

describe("AuthenticateUserUseCase", () => {
	it("deve retornar um token quando o email e a senha estiverem corretos", async () => {
		const findByEmail = vi.fn().mockResolvedValue(fakeUser);
		const usersRepository = { findByEmail } as unknown as UsersRepository;

		const compare = vi.fn().mockResolvedValue(true);
		const hashProvider: HashProvider = { compare };

		const generate = vi.fn().mockResolvedValue("token-falso-123");
		const tokenProvider: TokenProvider = { generate };

		const sut = new AuthenticateUserUseCase(
			usersRepository,
			hashProvider,
			tokenProvider,
		);

		const { token } = await sut.execute({
			email: "maria@example.com",
			password: "senha-123456",
		});

		expect(token).toBe("token-falso-123");
		expect(findByEmail).toHaveBeenCalledWith("maria@example.com");
		expect(compare).toHaveBeenCalledWith("senha-123456", "hash-do-banco");
	});
});
