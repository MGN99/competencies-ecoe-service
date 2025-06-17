export class CompetencyWithLevelNotFoundError extends Error {
    constructor(level: string, competency: string) {
        super(`"${competency}" with level "${level}" not found`);
    }
}