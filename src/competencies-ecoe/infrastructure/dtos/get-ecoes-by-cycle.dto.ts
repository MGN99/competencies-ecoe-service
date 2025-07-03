import { IsIn } from "class-validator";

export class GetEcoesByCycleDto {
    @IsIn(['BASICO', 'PROFESIONAL', 'FINAL'])
    cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL';
}