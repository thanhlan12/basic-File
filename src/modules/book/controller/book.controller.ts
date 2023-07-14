import { Controller } from "@nestjs/common";
import { BookService } from "../service/book.service";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";
import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Book } from "../entities/book.entity";
import { ApiTags } from "@nestjs/swagger";
import { BookModule } from "../book.module";
import { BookConditionDto } from "../dto/book-condition.dto";

@Controller("book")
@ApiTags("book")
export class BookController extends BaseControllerFactory<Book>(
    Book,
    BookConditionDto,
    CreateBookDto,
    UpdateBookDto,
    {
        import: {
            enable: false,
        },
    },
) {
    constructor(private readonly bookService: BookService) {
        super(bookService);
    }
}
