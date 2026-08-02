import { makeListUsersUseCase } from "@/use-cases/factories/make-list-users-use-case.js";
import { UserPresenter } from "@/http/presenters/user-presenter.js";
import type { FastifyReply, FastifyRequest } from "fastify";


export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const listUsersUseCase = makeListUsersUseCase()

        const users = await listUsersUseCase.execute()

        return reply.status(200).send(UserPresenter.toHTTP(users))

    } catch (error) {
        return reply.status(400).send({message: "Erro ao listar usuários"})
    }
    
}