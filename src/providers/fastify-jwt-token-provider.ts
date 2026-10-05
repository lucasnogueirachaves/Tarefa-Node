import type { FastifyReply } from "fastify";
import type { UserRole } from "@/@types/prisma/enums.js";
import type { TokenProvider } from "./token-provider.js";

export class FastifyJwtTokenProvider implements TokenProvider {
	constructor(private reply: FastifyReply) {}

	async generate(payload: { sub: string; role: UserRole }) {
		return this.reply.jwtSign(payload, { expiresIn: "1d" });
	}
}
