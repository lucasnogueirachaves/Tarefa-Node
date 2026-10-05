import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ProjectPresenter } from "@/http/presenters/project-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeGetProjectUseCase } from "@/use-cases/factories/make-get-project-use-case.js";

export async function getProject(request: FastifyRequest, reply: FastifyReply) {
	try {
		const getParamsSchema = z.object({
			publicId: z.string().uuid(),
		});

		const { publicId } = getParamsSchema.parse(request.params);

		const getProjectUseCase = makeGetProjectUseCase();
		const { project } = await getProjectUseCase.execute({ publicId });

		return reply.status(200).send(ProjectPresenter.toHTTP(project));
	} catch (error: unknown) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}
		throw error;
	}
}
