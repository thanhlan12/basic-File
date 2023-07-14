import { BaseImportControllerFactory } from "@config/controller/base-import-controller-factory";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Book } from "../entities/book.entity";
import { BookConditionDto } from "../dto/book-condition.dto";
import { ImportBookDto } from "../dto/import-book-dto";
import { BookImportService } from "../service/book-import.service";

@Controller("book")
@ApiTags("book")
export class BookImportController extends BaseImportControllerFactory<Book>(
    Book,
    BookConditionDto,
    {
        import: {
            dto: ImportBookDto,
        },
    },
) {
    constructor(private readonly bookImportService: BookImportService) {
        super(bookImportService);
    }
}
