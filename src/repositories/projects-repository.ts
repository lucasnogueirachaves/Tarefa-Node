import type {Prisma, Project, Task} from '@/@types/prisma/client.js'

export type ProjectWithTasks = Project & {
    tasks: Task[]
}

export interface ProjectsRepository {
    create(data: Prisma.ProjectCreateInput): Promise<Project>
    findMany(): Promise<Project[]>
    findById(publicID: string): Promise<ProjectWithTasks | null>
    update(publicId: string, data: Prisma.ProjectUpdateInput): Promise<Project | null>
    delete(publicId: string): Promise<void>
}