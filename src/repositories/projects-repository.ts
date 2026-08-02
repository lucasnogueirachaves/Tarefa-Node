import type {Prisma, Project} from '@/@types/prisma/client.js'

export interface ProjectsRepository {
    create(data: Prisma.ProjectCreateInput): Promise<Project>
    findMany(): Promise<Project[]>
    findById(publicID: string): Promise<Project | null>
    update(publicId: string, data: Prisma.ProjectUpdateInput): Promise<Project | null>
    delete(publicId: string): Promise<void>
}