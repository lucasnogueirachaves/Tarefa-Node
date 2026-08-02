import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeDeleteTaskUseCase } from "@/use-cases/factories/make-delete-tasks-use-case.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"


export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
    try {
        const paramsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = paramsSchema.parse(request.params)

        const deleteTaskUseCase = makeDeleteTaskUseCase()

        await deleteTaskUseCase.execute({
            publicId
        })

        return reply.status(204).send({message: "Tarefa excluída com sucesso!"})

    } catch(error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}