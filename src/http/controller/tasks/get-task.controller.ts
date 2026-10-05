import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeGetTaskUseCase } from "@/use-cases/factories/make-get-task-use-case.js";

export async function getTask(request: FastifyRequest, reply: FastifyReply) {
	try {
		const getParamsSchema = z.object({
			publicId: z.string().uuid(),
		});

		const { publicId } = getParamsSchema.parse(request.params);

		const getTaskUseCase = makeGetTaskUseCase();
		const { task } = await getTaskUseCase.execute({ publicId });

		return reply.status(200).send(task);
	} catch (error: unknown) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}
		throw error;
	}
}
