import { IsNotEmpty, IsString, Min } from "class-validator";
import { IsNumber } from "class-validator";

export class AddStudentToEcoeDto {
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    ecoeId: number;
}