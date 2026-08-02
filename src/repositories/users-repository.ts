import type {Prisma, User} from '@/@types/prisma/client.js'

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findMany(): Promise<User[]>
    findById(id: number): Promise<User | null>
}