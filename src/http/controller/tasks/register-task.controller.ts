import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterTaskUseCase } from "@/use-cases/factories/make-register-task-use-case.js"
import { TaskPriority } from "@/@types/prisma/enums.js"

export async function registerTask(request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerBodySchema = z.object({
        title: z.string(),
        description: z.string().optional(),
        priority: z.nativeEnum(TaskPriority),
        deadline: z.coerce.date().optional(),
        projectId: z.string().uuid()

    })

        const { title, description, priority, deadline, projectId } = registerBodySchema.parse(request.body)

        const registerTaskUseCase = makeRegisterTaskUseCase()

        const { task } = await registerTaskUseCase.execute({
            title,
            priority,
            projectPublicId: projectId,

            ...(description !== undefined ? { description } : {}),
            ...(deadline !== undefined ? { deadline } : {}),
        })

        return reply.status(201).send(task)

    } catch (error) {
        return reply.status(400).send({message: "Erro ao criar projeto"})
    }

}