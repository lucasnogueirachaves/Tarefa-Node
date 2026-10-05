import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { TaskPriority } from "@/@types/prisma/enums.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeGetTaskFilterUseCase } from "@/use-cases/factories/make-get-filter-tasks-use-case.js";

export async function getTaskFilter(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const getParamsSchema = z.object({
			priority: z.nativeEnum(TaskPriority).optional(),
			completed: z.coerce.boolean().optional(),
		});

		const { priority, completed } = getParamsSchema.parse(request.query);

		const getTaskFilterUseCase = makeGetTaskFilterUseCase();

		const tasks = await getTaskFilterUseCase.execute({
			...(priority !== undefined ? { priority: priority as TaskPriority } : {}),
			...(completed !== undefined ? { completed } : {}),
		} as unknown as Parameters<typeof getTaskFilterUseCase.execute>[0]);

		return reply.status(200).send(tasks);
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({
				message: error.message,
			});
		}

		throw error;
	}
}
