import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class EcoeIdDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    ecoeId: number;
}