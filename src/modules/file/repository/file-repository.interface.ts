import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { File } from "../entities/file.entity";
import { UpdateFileDto } from "../dto/update-file.dto";

export interface FileRepository extends BaseRepository<File> {
    getAll(): Promise<File[]>;
    AdmingetAll(): Promise<File[]>;
    update(id: string, dto: UpdateFileDto);
    UsergetAll(): Promise<File[]>;
    PrivateFile(id: string): Promise<File[]>;
    downloadFile(id: string);
}
