import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeDeleteProjectUseCase } from "@/use-cases/factories/make-delete-projects-use-case.js";

export async function deleteProject(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const getParamsSchema = z.object({
			publicId: z.string().uuid(),
		});

		const { publicId } = getParamsSchema.parse(request.params);

		const deleteProjectUseCase = makeDeleteProjectUseCase();

		await deleteProjectUseCase.execute({ publicId });

		return reply.status(200).send({ message: "Projeto deletado com sucesso!" });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}
		throw error;
	}
}
