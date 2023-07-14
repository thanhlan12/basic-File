import { Prop } from "@nestjs/mongoose";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpdateFileDto {
    @Prop()
    @IsBoolean()
    @IsOptional()
    isPublic: boolean;
}
