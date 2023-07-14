import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsString } from "class-validator";
import { HydratedDocument } from "mongoose";
import { type } from "os";

@Schema({
    collection: Entity.BOOK,
    timestamps: true,
})
export class Book implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString({ message: "Book's name" })
    @Prop({ required: true, unique: true })
    @EntityDefinition.field({ label: "Book's name", required: true })
    book_name: string;

    @IsString({ message: "Author" })
    @Prop()
    @EntityDefinition.field({ label: "Book's author", required: true })
    book_author: string;

    @IsNumber()
    @Prop()
    @EntityDefinition.field({ label: "Cost", required: true })
    book_cost: number;

    @IsNumber()
    @Prop()
    @EntityDefinition.field({ label: "Book's quantity", required: true })
    book_quantity: number;
}

export type BookDocument = HydratedDocument<Book>;
export const BookSchema = SchemaFactory.createForClass(Book);
