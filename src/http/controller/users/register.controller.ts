import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { RegisterUserUseCase } from "@/use-cases/users/register.js"
import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error.js"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerBodySchema = z.object({
            name: z.string().trim().min(1).max(100),
            email: z.email().max(100),
            password: z.string().min(8).max(100)
        })

        const {name, email, password} = registerBodySchema.parse(request.body)

        const usersRepository = new PrismaUserRepository()
        const {user} = await new RegisterUserUseCase(usersRepository).execute({
            name,
            email,
            password
        })

        return reply.status(201).send(user)

    } catch (error: unknown) {
        if(error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({message: error.message})
        }

        throw error
    }

}