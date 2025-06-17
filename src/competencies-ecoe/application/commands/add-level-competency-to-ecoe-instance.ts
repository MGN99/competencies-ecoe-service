export class AddLevelCompetencyToEcoeCommand {
    constructor(
        public readonly ecoeId: number,
        public readonly competencyId: number,
    ) {}
}