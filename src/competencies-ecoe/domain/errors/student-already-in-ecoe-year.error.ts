export class StudentAlreadyInEcoeYearError extends Error {
    constructor(studentId: string, ecoeYear: number) {
        super(`Student with id ${studentId} is already in ECOE year ${ecoeYear}`);
    }
}