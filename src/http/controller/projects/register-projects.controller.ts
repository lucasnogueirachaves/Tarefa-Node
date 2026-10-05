import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ProjectPresenter } from "@/http/presenters/project-presenter.js";
import { makeRegisterProjectUseCase } from "@/use-cases/factories/make-register-projects-use-cases.js";

export async function registerProject(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const registerBodySchema = z.object({
			name: z.string().trim().min(1).max(100),
			description: z.string().max(500).optional(),
			status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]),
		});

		const { name, description, status } = registerBodySchema.parse(
			request.body,
		);

		const registerProjectUseCase = makeRegisterProjectUseCase();
		const { project } = await registerProjectUseCase.execute({
			name,
			...(description !== undefined ? { description } : {}),
			...(status !== undefined ? { status } : {}),
		});

		return reply.status(201).send(ProjectPresenter.toHTTP(project));
	} catch (error) {
		return reply.status(400).send({ message: "Erro ao criar projeto" });
	}
}
