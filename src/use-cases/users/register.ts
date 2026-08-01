import type { User } from "@/@types/prisma/client.js"
import { hash } from "bcryptjs"
import { env } from "@/env/index.js"
import { prisma } from "../../libs/prisma.js"
import type { UsersRepository } from "@/repositories/users-repositoy.js"

interface RegisterUserUseCaseRequest {
    name: string,
    email: string,
    password: string
}

type RegisterUserUseCaseResponse = {
    user: User
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({
        name,
        email,
        password
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error("This email is already in use.")
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash
        })
        
        return {user}
        }
}