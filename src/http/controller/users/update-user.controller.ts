import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeUpdateUseCase } from "@/use-cases/factories/make-update-user.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = updateParamsSchema.parse(request.params)

        const registerBodySchema = z.object({
            name: z.string().trim().min(1).max(100).optional(),
            password: z.string().min(8).max(100).optional()
        })

        const { name, password } = registerBodySchema.parse(request.body)

        const updateUserUseCase = makeUpdateUseCase()

        const { user } = await updateUserUseCase.execute({
            publicId,
            ...(name !== undefined && { name }),
            ...(password !== undefined && { password }),
            loggedUserId: (request.user as { publicId: string }).publicId,
        })

        return reply.status(200).send(UserPresenter.toHTTP(user))

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        throw error
    }
}