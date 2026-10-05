import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeGetProjectTasksUseCase } from "@/use-cases/factories/make-get-project-tasks-use-case.js";

export async function getProjectTasks(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const paramsSchema = z.object({
			publicId: z.string().uuid(),
		});

		const { publicId } = paramsSchema.parse(request.params);

		const getProjectTasksUseCase = makeGetProjectTasksUseCase();

		const { tasks } = await getProjectTasksUseCase.execute({
			projectPublicId: publicId,
		});

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
