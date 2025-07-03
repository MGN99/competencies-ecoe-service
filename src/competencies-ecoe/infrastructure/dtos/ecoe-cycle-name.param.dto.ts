import { IsIn } from "class-validator";

export class EcoeCycleNameParamDto {
    @IsIn(['BASICO', 'PROFESIONAL', 'FINAL'])
    cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL';
}