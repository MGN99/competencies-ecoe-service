export class EcoeAlreadyExistsError extends Error {
    constructor(cycle: string, semester: number, year: number) {
        super(`ECOE for cycle ${cycle}, semester ${semester}, year ${year} already exists.`);
    }
}