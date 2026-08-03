import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeGetUserTasksUseCase } from "@/use-cases/factories/make-get-user-tasks-use-case.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function getUserTasks(request: FastifyRequest, reply: FastifyReply) {
    try {
        const paramsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = paramsSchema.parse(request.params)

        const getUserTasksUseCase = makeGetUserTasksUseCase()

        const { tasks } = await getUserTasksUseCase.execute({
            userPublicId: publicId
        })

        return reply.status(200).send(tasks)

    } catch(error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}