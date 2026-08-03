import { prisma } from "@/libs/prisma.js"
import type { Prisma } from "@/@types/prisma/client.js"
import type { TaskUsersRepository } from "../task-users-repository.js"


export class PrismaTaskUsersRepository implements TaskUsersRepository {
    async createMany(data: Prisma.TaskUserCreateManyInput[]) {
        await prisma.taskUser.createMany({
            data
        })
    }
    async delete(taskId: number, userId: number) {
        await prisma.taskUser.delete({
            where: {
                taskId_userId: {
                    taskId,
                    userId
                }
            }
        })
    }
}