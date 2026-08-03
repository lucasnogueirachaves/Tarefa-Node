import type { FastifyInstance } from "fastify"
import {register} from "./register.controller.js"
import { listUsers } from "./list-users.controller.js"
import { getUser } from "./get-user.controller.js"
import { updateUser } from "./update-user.controller.js"
import { deleteUser } from "./delete-user.js"
import { getUserTasks } from "./get-user-tasks.controller.js"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', register)
    app.get('/', listUsers)
    app.get('/:publicId', getUser)
    app.put('/:publicId', updateUser)
    app.delete('/:publicId', deleteUser)
    app.get('/:publicId/tasks', getUserTasks)
}