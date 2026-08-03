import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate.js"
import { UserPresenter } from "@/http/presenters/user-presenter.js"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.js"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authenticateBodySchema = z.object({
            email: z.email().max(100),
            password: z.string().min(8).max(100)
        })

        const { email, password } = authenticateBodySchema.parse(request.body)

        const authenticateUserUseCase = makeAuthenticateUseCase()
        const { user } = await authenticateUserUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign(
            {
                sub: user.publicId,
                role: user.role
            },
            {expiresIn: '1d'},
        )

        return reply.status(200).send({token, user: UserPresenter.toHTTP(user)})

    } catch (error) {
        if(error instanceof InvalidCredentialsError) {
            return reply.status(400).send({message: error.message})
        }

        throw error
    }

}