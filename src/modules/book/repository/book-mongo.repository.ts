import { MongoRepository } from "@module/repository/mongo/mongo.repository";
import { Book } from "../entities/book.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Entity } from "@module/repository";
import { Model } from "mongoose";
import { BookRepository } from "./book-repository.interface";

export class BookMongoRepository
    extends MongoRepository<Book>
    implements BookRepository
{
    constructor(
        @InjectModel(Entity.BOOK) private readonly bookModel: Model<Book>,
    ) {
        super(bookModel);
    }
}
