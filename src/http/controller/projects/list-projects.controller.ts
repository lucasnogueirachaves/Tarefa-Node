import type { FastifyReply, FastifyRequest } from "fastify"
import { ProjectPresenter } from "@/http/presenters/project-presenter.js"
import { makeListProjectUseCase } from "@/use-cases/factories/make-list-projects-use-case.js"


export async function listProject(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const listProjectUseCase = makeListProjectUseCase()
        const projects = await listProjectUseCase.execute()

        return reply.status(200).send(ProjectPresenter.toHTTP(projects))
    } catch (error) {
        return reply.status(400).send({ message: "Erro ao listar projeto" })
    }
}