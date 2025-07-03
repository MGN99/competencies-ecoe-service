export class AlreadyCompetencyEvaluatedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AlreadyCompetencyEvaluatedError';
    }
}