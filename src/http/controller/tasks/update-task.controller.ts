import { z } from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { TaskPriority } from "@/@types/prisma/enums.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeUpdateTaskUseCase } from "@/use-cases/factories/make-update-tasks-use-case.js"


export async function updateTask(request: FastifyRequest, reply: FastifyReply){

    try {
        const paramsSchema = z.object({
            publicId: z.string().uuid()
        })


        const bodySchema = z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            priority: z.nativeEnum(TaskPriority).optional(),
            completed: z.boolean().optional(),
            deadline: z.coerce.date().optional()
        })


        const { publicId } = paramsSchema.parse(request.params)

        const data = bodySchema.parse(request.body)

        const updateTaskData = {
            publicId,
            ...(data.title !== undefined && { title: data.title }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.priority !== undefined && { priority: data.priority }),
            ...(data.completed !== undefined && { completed: data.completed }),
            ...(data.deadline !== undefined && { deadline: data.deadline })
        }

        const updateTaskUseCase = makeUpdateTaskUseCase()


        const { task } = await updateTaskUseCase.execute(updateTaskData)


        return reply.status(200).send(task)
    } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                    return reply.status(404).send({message: error.message})
            }
            throw error
        }

}