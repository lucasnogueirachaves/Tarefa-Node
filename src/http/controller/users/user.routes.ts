import type { FastifyInstance } from "fastify"
import {register} from "./register.controller.js"
import { listUsers } from "./list-users.controller.js"
import { getUser } from "./get-user.controller.js"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', register)
    app.get('/', listUsers)
    app.get('/:id', getUser)
}