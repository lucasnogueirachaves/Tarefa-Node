import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { DeleteUserUseCase } from "../users/delete-user.js"

export function makeDeleteUserUseCase() {
    const usersRepository = new PrismaUserRepository()
    const deleteUserUserUseCase = new DeleteUserUseCase(usersRepository)

    return deleteUserUserUseCase
}