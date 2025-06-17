import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class AddEcoeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
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