import type { Prisma} from '@/@types/prisma/client.js';
import type { ProjectsRepository } from "../projects-repository.js";
import { prisma } from '@/libs/prisma.js';


export class PrismaProjectRepository implements ProjectsRepository {
    async create(data: Prisma.ProjectCreateInput) {
        return await prisma.project.create({ data })
    }
    async findMany(){
        return await prisma.project.findMany()
    }
    async findById(publicId: string){
        return await prisma.project.findUnique({
            where: {
                publicId
            }
        })
    }
}