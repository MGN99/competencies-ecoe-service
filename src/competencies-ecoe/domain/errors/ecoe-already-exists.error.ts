export class EcoeAlreadyExistsError extends Error {
    constructor(semester: number, year: number) {
        super(`Ecoe already exists for semester ${semester} and year ${year}`);
    }
}