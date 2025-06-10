export class AddStudentToEcoeCommand {
    constructor(
        public readonly studentId: string,
        public readonly ecoeInstanceId: number,
    ) {}
}