import { FileRepository } from "@module/file/repository/file-repository.interface";
import { Entity } from "@module/repository";
import { MongoRepository } from "@module/repository/mongo/mongo.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { File } from "../entities/file.entity";
import { forEach } from "lodash";
import { UpdateFileDto } from "../dto/update-file.dto";
import { NotFoundException, StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";

export class FileMongoRepository
    extends MongoRepository<File>
    implements FileRepository
{
    constructor(
        @InjectModel(Entity.FILE) private readonly fileModel: Model<File>,
    ) {
        super(fileModel);
    }

    getAll(): Promise<File[]> {
        return this.fileModel.find().exec();
    }

    async AdmingetAll(): Promise<File[]> {
        const list = [];
        const token = await this.fileModel.find().exec();
        const filteed = token.filter(function (File) {
            if (!File.isPublic) {
                list.push(File);
            }
        });
        return list;
    }

    async UsergetAll(): Promise<File[]> {
        const list = [];
        const token = await this.fileModel.find().exec();
        const filteed = token.filter(function (File) {
            if (File.isPublic) {
                list.push(File);
            }
        });
        return list;
    }

    async PrivateFile(id: string): Promise<File[]> {
        const list = [];
        const token = await this.fileModel.find().exec();
        const filteed = token.filter(function (File) {
            if (File.author.match(id)) {
                list.push(File);
            }
        });
        return list;
    }

    async update(id: string, dto: UpdateFileDto) {
        const res = await this.fileModel.findByIdAndUpdate(id, dto);
        return res;
    }

    async downloadFile(id: string) {
        const files = await this.fileModel.findById(id);
        if (files) {
            files.count_view++;
            files.save();
        }
        return files;
    }
}
