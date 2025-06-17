export class StudentAlreadyInEcoeError extends Error {
    constructor(studentId: string) {
        super(`Student ${studentId} already in ECOE`);
    }
}