import type { Prisma } from '@/@types/prisma/client.js';
import type { UsersRepository } from '../users-repository.js';
import { prisma } from '@/libs/prisma.js';


export class PrismaUserRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({data})
    }
    async findMany() {
        return prisma.user.findMany()
    }
    async findByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        },
    })
}
    async findById(publicId: string) {
        return prisma.user.findUnique({
            where: {
                publicId
            }
        })
    }
    async update(publicId: string, data: Prisma.UserUpdateInput){
        return await prisma.user.update({
            where: {publicId},
            data
        })
    }
    async delete(publicId: string) {
        await prisma.user.delete({
            where: {
                publicId
            }
        })
    }
}