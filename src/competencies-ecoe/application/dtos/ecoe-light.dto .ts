export class EcoeLightDto {
    id: number;
    name: string;
    cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL';
    year: number;
    semester: number;
    description: string;
}
