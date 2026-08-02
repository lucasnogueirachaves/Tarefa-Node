import { makeDeleteUserUseCase } from "@/use-cases/factories/make-delete-user.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const {publicId} = getParamsSchema.parse(request.params)

        const deleteUserUseCase = makeDeleteUserUseCase()

        await deleteUserUseCase.execute({ publicId})

        return reply.status(204).send({message: "Usuário deletado com sucesso!"})

    } catch (error) {
        return reply.status(400).send({message: "Erro ao buscar usuário"})
    }
}