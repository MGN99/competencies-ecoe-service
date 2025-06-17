
export class LevelCompetencyCommand {
    constructor(
        public readonly competencyId: number,
        public readonly level: string,
        public readonly description: string,
    ) {}
}