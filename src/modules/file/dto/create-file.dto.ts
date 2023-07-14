import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsIn } from "class-validator";

export class CreateFileDto {
    @ApiProperty({ type: "string", format: "binary" })
    @Allow()
    file: string;

    @ApiProperty({ default: "0" })
    public: string;
}
