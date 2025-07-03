import { Type } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty } from "class-validator";

export class AddEcoeDto {
    @IsNotEmpty()
    name: string;

    @IsIn(['BASICO', 'PROFESIONAL', 'FINAL'])
    cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL';

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    semester: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    year: number;

    @IsNotEmpty()
    description: string;
}