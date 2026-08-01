import type { FastifyInstance } from "fastify"
import {register} from "./register.js"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', register)
}