import { OmitType } from "@nestjs/swagger";
import { Book } from "../entities/book.entity";
import { IsString } from "class-validator";

export class CreateBookDto extends OmitType(Book, ["_id"]) {
    @IsString()
    "abc": string;
}
