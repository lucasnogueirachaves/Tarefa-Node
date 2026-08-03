import type { Prisma} from "@/@types/prisma/client.js"

export interface TaskUsersRepository {

    createMany(data: Prisma.TaskUserCreateManyInput[]): Promise<void>
    delete(taskId: number, userId: number): Promise<void>
}