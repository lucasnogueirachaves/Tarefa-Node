import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserRole } from "@/@types/prisma/enums.js";

export function verifyUserRole(alloweredRoles: UserRole[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { role } = request.user as { sub: string; role: UserRole };

		if (!alloweredRoles.includes(role)) {
			return reply
				.status(403)
				.send({ message: "Você não tem permissão para acessar este recurso." });
		}
	};
}
