import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Book } from "../entities/book.entity";

export type BookRepository = BaseRepository<Book>;
