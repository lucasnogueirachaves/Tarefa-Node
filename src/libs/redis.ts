import { Redis } from "ioredis";
import { env } from "@/env/index.js";

export const redis = new Redis({
	host: env.REDIS_HOST,
	port: env.REDIS_PORT,
	...(env.REDIS_PASSWORD ? { password: env.REDIS_PASSWORD } : {}),
	maxRetriesPerRequest: 1,
});

redis.on("error", (error) => {
	console.error("[redis] erro de conexão:", error.message);
});

export const PROJECTS_LIST_CACHE_KEY = "projects:list";
export const PROJECTS_LIST_CACHE_TTL_SECONDS = 60;

export async function invalidateProjectsListCache() {
	try {
		await redis.del(PROJECTS_LIST_CACHE_KEY);
	} catch (error) {
		console.error("[cache] falha ao invalidar a listagem de projetos:", error);
	}
}
