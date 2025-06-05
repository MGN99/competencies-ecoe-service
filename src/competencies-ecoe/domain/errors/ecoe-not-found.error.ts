export class EcoeNotFoundError extends Error {
    constructor(ecoeId: number) {
        super(`Ecoe with id ${ecoeId} not found`);
    }
}