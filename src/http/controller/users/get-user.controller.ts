import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { makeGetUserUseCase } from "@/use-cases/factories/make-get-user.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const {publicId} = getParamsSchema.parse(request.params)

        const getUserUseCase = makeGetUserUseCase()

        const { user } = await getUserUseCase.execute({ publicId})

        return reply.status(200).send(UserPresenter.toHTTP(user))

    } catch (error) {
        return reply.status(400).send({message: "Erro ao buscar usuário"})
    }
}