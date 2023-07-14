import { FileMongoRepository } from "@module/file/repository/file-mongo.repository";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";
import { MulterConfigService } from "./common/multer-config.service";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { JwtModule } from "@nestjs/jwt";
import { FilePublicController } from "./file-public.controller";
import { File } from "./entities/file.entity";

@Module({
    imports: [
        File,
        MulterModule.registerAsync({
            useClass: MulterConfigService,
            inject: [ConfigService],
        }),
        JwtModule.register({}),
        FileModule,
    ],
    providers: [
        FileService,
        RepositoryProvider(Entity.FILE, FileMongoRepository),
    ],
    controllers: [FileController, FilePublicController],
})
export class FileModule {}
