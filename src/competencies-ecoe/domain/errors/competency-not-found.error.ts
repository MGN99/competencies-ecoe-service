export class CompetencyNotFoundError extends Error {
    constructor(competencyId: number) {
        super(`Competency with id ${competencyId} not found`);
    }
}