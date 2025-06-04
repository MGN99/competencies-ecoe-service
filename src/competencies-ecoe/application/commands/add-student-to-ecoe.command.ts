export class AddStudentToEcoeCommand {
    constructor(
        public readonly studentId: string,
        public readonly ecoeId: number,
    ) {}
}