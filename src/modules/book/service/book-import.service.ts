import { BaseImportService } from "@config/service/base-import.service";
import { Book } from "../entities/book.entity";
import { BookRepository } from "../repository/book-repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectTransaction } from "@module/repository/common/transaction";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";

@Injectable()
export class BookImportService extends BaseImportService<Book, BookRepository> {
    constructor(
        @InjectRepository(Entity.BOOK)
        private readonly bookRepository: BookRepository,
        @InjectTransaction()
        private readonly bookTransaction: BaseTransaction,
    ) {
        super(bookRepository, { transaction: bookTransaction });
    }
}
