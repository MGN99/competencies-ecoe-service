import { IsEnum, IsNotEmpty } from 'class-validator';

export enum CycleType {
  BASICO = 'BASICO',
  PROFESIONAL = 'PROFESIONAL',
  FINAL = 'FINAL',
}

export class GetEcoesByCycleDto {
    @IsNotEmpty()
    @IsEnum(CycleType, {
    message: 'Invalid cycle type',
    })
    cycle: CycleType;
}