import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { BaseService } from "@config/service/base.service";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";
import { SettingService } from "@module/setting/setting.service";
import { ConfigService } from "@nestjs/config";
import { Configuration } from "@config/configuration";
import { InjectTransaction } from "@module/repository/common/transaction";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { BookRepository } from "../repository/book-repository.interface";
import { Book } from "../entities/book.entity";

@Injectable()
export class BookService extends BaseService<Book, BookRepository> {
    constructor(
        @InjectRepository(Entity.BOOK)
        private readonly bookRepository: BookRepository,
        private readonly configService: ConfigService<Configuration>,
        @InjectTransaction()
        private readonly bookTransaction: BaseTransaction,
    ) {
        super(bookRepository, {
            notFoundCode: "error-book-not-found",
            transaction: bookTransaction,
        });
    }
}
