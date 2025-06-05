import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { IsNumber } from "class-validator";

export class AddStudentToEcoeDto {
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    ecoeId: number;
}