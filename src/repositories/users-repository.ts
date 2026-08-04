import type {Prisma, User, TaskUser, Task} from '@/@types/prisma/client.js'

export type UserWithTasks = User & {
    taskUsers: (TaskUser & {
        task: Task
    })[]
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findMany(): Promise<UserWithTasks[]>
    findByEmail(email: string): Promise<User | null>
    findById(publicID: string): Promise<UserWithTasks | null>
    findManyByPublicId(publicIds: string[]): Promise<User[]>
    update(publicId: string, data: Prisma.UserUpdateInput): Promise<User | null>
    delete(publicId: string): Promise<void>
}