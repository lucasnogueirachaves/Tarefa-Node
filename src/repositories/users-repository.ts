import type {Prisma, User} from '@/@types/prisma/client.js'

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findMany(): Promise<User[]>
    findById(publicID: string): Promise<User | null>
    update(publicId: string, data: Prisma.UserUpdateInput): Promise<User | null>
}