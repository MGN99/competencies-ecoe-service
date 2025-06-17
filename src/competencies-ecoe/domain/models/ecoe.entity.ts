import { EcoeStudent } from "./ecoe-student.entity";

export class Ecoe {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL',
        public readonly semester: number,
        public readonly year: number,
        public readonly description: string,
        public readonly students: EcoeStudent[] = [],
    ) { }
}