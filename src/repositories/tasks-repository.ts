import type { Prisma, Task } from '@/@types/prisma/client.js'

export interface TasksRepository {
    findMany(filters?: {
        priority?: string
        completed?: boolean
    }): Promise<Task[]>

    findById(publicId: string): Promise<Task>
    create(data: Prisma.TaskCreateInput): Promise<Task>
}