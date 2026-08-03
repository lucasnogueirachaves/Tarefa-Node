import type { Prisma, Task } from '@/@types/prisma/client.js'

export interface TasksRepository {
    findMany(filters?: {
        priority?: string
        completed?: boolean
    }): Promise<Task[]>

    findById(publicId: string): Promise<Task>
    create(data: Prisma.TaskCreateInput): Promise<Task>
    update(publicId: string, data: Prisma.TaskUpdateInput): Promise<Task>
    delete(publicId: string): Promise<void>
    findManyByProject(projectId: number): Promise<Task[]>
    findManyByUser(userId: number): Promise<Task[]>
}