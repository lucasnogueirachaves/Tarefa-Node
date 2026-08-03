import type { FastifyInstance } from "fastify"
import {register} from "./register.controller.js"
import { listUsers } from "./list-users.controller.js"
import { getUser } from "./get-user.controller.js"
import { updateUser } from "./update-user.controller.js"
import { deleteUser } from "./delete-user.js"
import { getUserTasks } from "./get-user-tasks.controller.js"
import { authenticate } from "./authenticate.controller.js"
import { verifyJwt } from "@/http/middlewares/verify-jwt.js"
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', register)
    app.post('/authenticate', authenticate)
    app.get('/', {onRequest: [verifyJwt]}, listUsers)
    app.get('/:publicId', {onRequest: [verifyJwt]}, getUser)
    app.put('/:publicId', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, updateUser) // Fazer acesso do proprio usuario
    app.delete('/:publicId', {onRequest: [verifyJwt, verifyUserRole(['ADMIN'])]}, deleteUser)
    app.get('/:publicId/tasks', {onRequest: [verifyJwt]}, getUserTasks)
}