export class LevelCompetencyInEcoeAlreadyExistsError extends Error {
    constructor(levelCompetencyId: number) {
        super(`Level competency with id ${levelCompetencyId} already exists in ecoe`);
    }
}