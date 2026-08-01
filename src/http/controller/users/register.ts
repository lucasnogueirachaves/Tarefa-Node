import z from "zod"
import { prisma } from "../../../../libs/prisma.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import { hash } from "bcryptjs"
import { env } from "@/env/index.js"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        email: z.email().max(100),
        password: z.string().min(8).max(100)
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const userWithSameEmail = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        return reply.status(409).send({message: 'This email is already in use. '})
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash
        }
    })

    return reply.status(201).send(user)
}