import { Competency } from "./competency.entity";

export class LevelCompetency {
    constructor(
        public readonly competency: Competency,
        public readonly level: string,
        public readonly descriptor: string,
        public readonly id?: number,
    ) {}
}