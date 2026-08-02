import { prisma } from "@/libs/prisma.js"
import type { Prisma } from '@/@types/prisma/client.js';
import type { TaskPriority } from "@/@types/prisma/enums.js"
import type { TasksRepository } from "../tasks-repository.js"
export class PrismaTasksRepository implements TasksRepository {

    async findMany(filters?: {
        priority?: TaskPriority
        completed?: boolean
    }) {

        return await prisma.task.findMany({
            where: {
                ...(filters?.priority !== undefined && { priority: filters.priority }),
                ...(filters?.completed !== undefined && { completed: filters.completed }),
            }
        })
    }
    async findById(publicId: string){
        return await prisma.task.findUniqueOrThrow({
            where: {
                publicId
            }
        })
    }
    async create(data: Prisma.TaskCreateInput) {
        return await prisma.task.create({
            data
        })
    }
}