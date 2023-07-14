import { PickType } from "@nestjs/swagger";
import { Book } from "../entities/book.entity";

export class ImportBookDto extends PickType(Book, [
    "book_name",
    "book_author",
    "book_cost",
]) {}
