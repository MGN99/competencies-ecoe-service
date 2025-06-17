import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from "class-validator";

export class AddStudentToEcoeDto {
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    ecoeId: number;
}