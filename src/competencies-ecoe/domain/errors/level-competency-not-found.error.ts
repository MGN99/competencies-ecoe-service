export class LevelCompetencyNotFoundError extends Error {
    constructor(id: number) {
        super(`Level competency with id ${id} not found`);
    }
}