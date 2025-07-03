export class EcoeStudentNotFoundError extends Error {
    constructor(id: number) {
        super(`EcoeStudent with id ${id} not found`);
    }
}