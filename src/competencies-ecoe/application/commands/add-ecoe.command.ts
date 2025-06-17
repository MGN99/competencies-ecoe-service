
export class AddEcoeCommand {
    constructor(
        public readonly name: string,
        public readonly cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL',
        public readonly description: string,
        public readonly year: number,
        public readonly semester: number,
    ) { }
}