import { Module } from "@nestjs/common"
import { EntryController } from "./entry.controller"
import { EntryService } from "./entry.service"
import { Entry } from "./entry.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "../user/user.module"
import { FileModule } from "../file/file.module"


@Module({
    controllers: [EntryController],
    imports: [
        TypeOrmModule.forFeature([Entry]),
        UserModule, 
        FileModule
    ],
    providers: [
        EntryService
    ]
})
export class EntryModule {}