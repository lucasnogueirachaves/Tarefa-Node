import type {Prisma, Project} from '@/@types/prisma/client.js'

export interface ProjectsRepository {
    create(data: Prisma.ProjectCreateInput): Promise<Project>
    findMany(): Promise<Project[]>
}