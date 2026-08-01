import type { FastifyInstance } from "fastify"
import { usersRoutes } from "./users/user.routes.js"

export async function appRoutes(app: FastifyInstance) {
    app.register(usersRoutes, {prefix: '/users'})
}