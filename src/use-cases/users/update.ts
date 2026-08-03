import type { User } from "@/@types/prisma/client.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import bcrypt from "bcryptjs";
import { env } from "@/env/index.js";
import { NotLoggedError } from "../errors/not-logged-error.js";

interface UpdateUserUseCaseRequest {
    publicId: string,
    name?: string,
    password?: string
    loggedUserId: string
}

type UpdateUserUseCaseResponse = {
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ publicId, name, password, loggedUserId }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const userToUpdate = await this.usersRepository.findById(publicId)

        if (!userToUpdate) {
            throw new ResourceNotFoundError()
        }

        const userToUpdateId = userToUpdate?.publicId

        if(userToUpdateId !== loggedUserId) {
            throw new NotLoggedError()
        }

        const dataToUpdate: {
            name?: string
            password?: string
        } = {}

        if (name !== undefined) {
            dataToUpdate.name = name
        }

        if (password !== undefined) {
            dataToUpdate.password = await bcrypt.hash(
                password,
                env.HASH_SALT_ROUNDS
            )
        }

        const user = await this.usersRepository.update(userToUpdate.publicId, dataToUpdate)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}