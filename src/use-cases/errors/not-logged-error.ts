export class NotLoggedError extends Error {
    constructor() {
        super('É preciso estar logado como esse usuário para realizar essa ação.')
    }
}