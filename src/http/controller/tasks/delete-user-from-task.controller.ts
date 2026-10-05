import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeDeleteUserFromTaskUseCase } from "@/use-cases/factories/make-delete-user-from-task-use-case.js";

export async function deleteUserFromTask(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const paramsSchema = z.object({
			publicId: z.string().uuid(),
			userId: z.string().uuid(),
		});

		const { publicId, userId } = paramsSchema.parse(request.params);

		const deleteUserFromTaskUseCase = makeDeleteUserFromTaskUseCase();

		await deleteUserFromTaskUseCase.execute({
			taskPublicId: publicId,
			userPublicId: userId,
		});

		return reply.status(204).send();
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({
				message: error.message,
			});
		}
		throw error;
	}
}
