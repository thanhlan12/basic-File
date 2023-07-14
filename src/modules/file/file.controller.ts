import { ApiRecordResponse } from "@common/decorator/api.decorator";
import {
    AllowSystemRoles,
    Authorization,
    ReqUser,
} from "@common/decorator/auth.decorator";
import { User } from "@module/user/entities/user.entity";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreateFileResponseDto } from "./dto/create-file-response.dto";
import { CreateFileTransformedDto } from "./dto/create-file-transformed.interface";
import { CreateFileDto } from "./dto/create-file.dto";
import { File } from "./entities/file.entity";
import { FileService } from "./file.service";
import { FileUploadTransform } from "./pipe/file-upload-transform.pipe";
import { createReadStream } from "fs";
import { join } from "lodash";
import { Allow } from "class-validator";
import { Request, Response } from "express";
import { SystemRole } from "@module/user/common/constant";
import { UpdateFileDto } from "./dto/update-file.dto";

@UseInterceptors(FileInterceptor)
@Controller("file")
@ApiTags("file")
@Authorization()
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post()
    @AllowSystemRoles(SystemRole.USER)
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor("file"))
    @ApiRecordResponse(CreateFileResponseDto)
    @ApiBody({ type: CreateFileDto })
    async create(
        @ReqUser() user: User,
        @Body(FileUploadTransform) dto: CreateFileTransformedDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const data = await this.fileService.create(user, dto, file);
        return data;
    }

    @Delete(":id")
    @AllowSystemRoles(SystemRole.USER)
    @ApiRecordResponse(File)
    async deleteById(@ReqUser() user: User, @Param("id") id: string) {
        await this.fileService.deleteById(user, id);
    }

    @Get("/listFile")
    @AllowSystemRoles(SystemRole.USER)
    async find(@ReqUser() user: User): Promise<File[]> {
        return this.fileService.find();
    }

    @Get("/AdminCheckFile")
    @AllowSystemRoles(SystemRole.ADMIN)
    async find_notPublic(@ReqUser() user: User): Promise<File[]> {
        return this.fileService.find_notPublic();
    }

    @Get("/UserGetFile")
    @AllowSystemRoles(SystemRole.USER)
    async find_Public(@ReqUser() user: User): Promise<File[]> {
        return this.fileService.find_Public();
    }

    @Get("/User-privateFile")
    @AllowSystemRoles(SystemRole.USER)
    async privateFile(@ReqUser() user: User): Promise<File[]> {
        const id = user._id;
        return this.fileService.privateFile(id);
    }

    @Get("download/:id")
    async downloadFile(
        @Param("id") id: string,
        @ReqUser() user: User,
        @Res({ passthrough: true }) res: Response,
    ) {
        const name = await this.fileService.downFile(id);
        const file = createReadStream(join(process.cwd(), name));
        res.set({
            "Content-Type": "application/json",
            "Content-Disposition": 'attachment; filename="package.json"',
        });
        return new StreamableFile(file);
    }

    @Put(":id")
    @AllowSystemRoles(SystemRole.ADMIN)
    async update(
        @Param("id") id: string,
        @Body() dto: UpdateFileDto,
        @ReqUser() user: User,
    ) {
        const res = await this.fileService.updatebyAdmin(id, dto);
        return res;
    }
}
