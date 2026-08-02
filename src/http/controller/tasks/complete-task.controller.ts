import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCompleteTaskUseCase } from "@/use-cases/factories/make-complete-task-use-case.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"


export async function completeTask(request: FastifyRequest, reply: FastifyReply) {
    try {
        const paramsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = paramsSchema.parse(request.params)

        const completeTaskUseCase = makeCompleteTaskUseCase()

        const { task } = await completeTaskUseCase.execute({
            publicId
        })

        return reply.status(200).send(task)

    } catch(error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}