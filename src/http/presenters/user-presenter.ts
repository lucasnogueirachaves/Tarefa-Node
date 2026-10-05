import type { Task, TaskUser, User } from "@/@types/prisma/client.js";

type UserWithTasks = User & {
	taskUsers: (TaskUser & {
		task: Task;
	})[];
};

type HTTPUser = {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	tasks: {
		id: string;
		title: string;
		description: string | null;
		priority: string;
		completed: boolean;
		deadline: Date | null;
	}[];
};

export class UserPresenter {
	static toHTTP(user: UserWithTasks): HTTPUser;
	static toHTTP(users: UserWithTasks[]): HTTPUser[];
	static toHTTP(input: UserWithTasks | UserWithTasks[]): HTTPUser | HTTPUser[] {
		if (Array.isArray(input)) {
			return input.map((user) => this.toHTTP(user));
		}

		return {
			id: input.publicId,
			name: input.name,
			email: input.email,
			createdAt: input.createdAt,
			updatedAt: input.updateAt,
			tasks: input.taskUsers.map((taskUser) => ({
				id: taskUser.task.publicId,
				title: taskUser.task.title,
				description: taskUser.task.description,
				priority: taskUser.task.priority,
				completed: taskUser.task.completed,
				deadline: taskUser.task.deadline,
			})),
		};
	}
}
