import type { FastifyReply } from "fastify";
import { BcryptHashProvider } from "@/providers/bcrypt-hash-provider.js";
import { FastifyJwtTokenProvider } from "@/providers/fastify-jwt-token-provider.js";
import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { AuthenticateUserUseCase } from "../users/authenticate.js";

export function makeAuthenticateUseCase(reply: FastifyReply) {
	return new AuthenticateUserUseCase(
		new PrismaUserRepository(),
		new BcryptHashProvider(),
		new FastifyJwtTokenProvider(reply),
	);
}
