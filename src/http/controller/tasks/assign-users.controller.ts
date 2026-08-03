import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeAssignUsersToTaskUseCase } from "@/use-cases/factories/make-assign-users-to-task-use-case.js"


export async function assignUsers(request: FastifyRequest, reply: FastifyReply) {

    const paramsSchema = z.object({
        publicId: z.string().uuid()
    })

    const bodySchema = z.object({
        userIds: z.array(
            z.string().uuid()
        )
    })

    const { publicId } = paramsSchema.parse(request.params)
    const { userIds } = bodySchema.parse(request.body)

    const assignUsersUseCase = makeAssignUsersToTaskUseCase()

    await assignUsersUseCase.execute({
        taskPublicId: publicId,
        userPublicIds: userIds
    })

    return reply.status(204).send()
}