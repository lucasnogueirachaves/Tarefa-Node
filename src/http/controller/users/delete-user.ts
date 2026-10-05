import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeDeleteUserUseCase } from "@/use-cases/factories/make-delete-user.js";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
	try {
		const getParamsSchema = z.object({
			publicId: z.string().uuid(),
		});

		const { publicId } = getParamsSchema.parse(request.params);

		const deleteUserUseCase = makeDeleteUserUseCase();

		await deleteUserUseCase.execute({ publicId });

		return reply.status(200).send({ message: "Usuário deletado com sucesso!" });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}
		throw error;
	}
}
