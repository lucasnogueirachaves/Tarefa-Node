import type { Prisma, Task, TaskUser, User } from "@/@types/prisma/client.js";

export type TaskWithUsers = Task & {
	taskUsers: (TaskUser & {
		user: User;
	})[];
};
export interface TasksRepository {
	findMany(filters?: {
		priority?: string;
		completed?: boolean;
	}): Promise<Task[]>;

	findById(publicId: string): Promise<TaskWithUsers | null>;
	create(data: Prisma.TaskCreateInput): Promise<Task>;
	update(publicId: string, data: Prisma.TaskUpdateInput): Promise<Task>;
	delete(publicId: string): Promise<void>;
	findManyByProject(projectId: number): Promise<Task[]>;
	findManyByUser(userId: number): Promise<Task[]>;
}
