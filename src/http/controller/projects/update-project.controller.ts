import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeUpdateProjectUseCase } from "@/use-cases/factories/make-update-project-use-case.js"
import { ProjectPresenter } from "@/http/presenters/project-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function updateProject(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicId: z.string().uuid()
        })
        
        const { publicId } = updateParamsSchema.parse(request.params)

        const updateBodySchema = z.object({
            name: z.string().trim().min(1).max(100),
            description: z.string().max(500).optional(),
            status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"])
        })

        const {name, description, status} = updateBodySchema.parse(request.body)

        const updateProjectUseCase = makeUpdateProjectUseCase()
        const { project } = await updateProjectUseCase.execute({
            publicId,
            name,
            status,
            ...(description !== undefined && { description }),
        })

        return reply.status(201).send(ProjectPresenter.toHTTP(project))

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
                return reply.status(404).send({message: error.message})
        }
        throw error
    }

}