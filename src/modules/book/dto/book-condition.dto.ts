import { IsOptional } from "class-validator";

export class BookConditionDto {
    @IsOptional()
    book_name?: any;

    @IsOptional()
    book_author?: any;

    @IsOptional()
    book_cost?: any;

    @IsOptional()
    book_quantity?: any;
}
