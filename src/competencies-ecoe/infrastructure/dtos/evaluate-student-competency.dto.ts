import { Type } from 'class-transformer';
import { IsNumber, Min, Max, IsNotEmpty, IsInt } from 'class-validator';

export class EvaluateStudentCompetencyDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    ecoeStudentId: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    competencyId: number;

    @IsNumber()
    @Min(1)
    @Max(7)
    grade: number;
}
