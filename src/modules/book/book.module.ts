import { Module } from "@nestjs/common";
import { BookService } from "./service/book.service";
import { BookController } from "./controller/book.controller";
import { RepositoryProvider } from "@module/repository/common/repository";
import { Entity } from "@module/repository";
import { BookMongoRepository } from "./repository/book-mongo.repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { MongoTransaction } from "@module/repository/mongo/mongo.transaction";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportBookDto } from "./dto/import-book-dto";
import { BookImportController } from "./controller/book-import.controller";
import { BookImportService } from "./service/book-import.service";

@Module({
    controllers: [BookController, BookImportController],
    providers: [
        BookService,
        BookImportService,
        RepositoryProvider(Entity.BOOK, BookMongoRepository),
        TransactionProvider(MongoTransaction),
    ],
    exports: [BookService],
})
export class BookModule {}
