import type { FastifyInstance } from "fastify"
import {register} from "./register.controller.js"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', register)
}