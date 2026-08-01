export class UserAlreadyExistsError extends Error {
    constructor() {
        super('Já existe um usuário com esse email no sistema!')
    }
}