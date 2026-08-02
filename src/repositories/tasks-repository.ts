import type {Task} from '@/@types/prisma/client.js'

export interface TasksRepository {
    findMany(filters?: {
        priority?: string
        completed?: boolean
    }): Promise<Task[]>
}