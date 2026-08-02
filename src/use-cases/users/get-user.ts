import type { User } from "@/@types/prisma/client.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface GetUserUseCaseRequest {
    id: number
}

type GetUserUseCaseResponse = {
    user: User
}

export class GetUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ id }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {user}
    }
}