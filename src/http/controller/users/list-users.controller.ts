import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { ListUsersUseCase } from "@/use-cases/users/list-users.js";
import type { FastifyReply, FastifyRequest } from "fastify";


export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const usersRepository = new PrismaUserRepository()

        const listUsersUseCase = new ListUsersUseCase(usersRepository)

        const users = await listUsersUseCase.execute()

        return reply.status(200).send(users)

    } catch (error) {
        return reply.status(400).send({message: "Erro ao listar usuários"})
    }
    
}