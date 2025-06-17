export class EcoesLevelNotFoundError extends Error {
    constructor(level: string) {
        super(`Ecoes with level ${level} not found`);
    }
}