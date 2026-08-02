import type { Prisma, User } from '@/@types/prisma/client.js';
import type { UsersRepository } from '../users-repository.js';
import { prisma } from '@/libs/prisma.js';


export class PrismaUserRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({data})
    }
    async findMany() {
        return prisma.user.findMany()
    }
    
}