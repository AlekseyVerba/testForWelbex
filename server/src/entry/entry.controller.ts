import { Controller, Post, UseGuards, Body,
        UseInterceptors, UploadedFiles, 
        Delete, ParseIntPipe, Param, Put, Get, Query } from "@nestjs/common"
import { EntryService } from "./entry.service"
import { Entry } from "./entry.entity"
import { AuthGuard } from "../guards/auth.guard"
import { CreateOrUpdateEntityDto } from "./dto/createEntity.dto"
import { ValidationPipe } from "../pipes/validation.pipe"
import { FilesInterceptor } from "@nestjs/platform-express"
import { UserProperty } from "../decorators/userProperty.decorator"
import { IResponseSuccess } from "../types/response/index.interface"
import { Express } from "express"
import { Multer } from 'multer';

@Controller("entry")
export class EntryController {

    constructor(
        private entryService: EntryService
    ) {}

    @Get(":id")
    async getEntry(
        @Param("id", ParseIntPipe) id:number
    ): Promise<IResponseSuccess<Entry>> {
        const entry = await this.entryService.getOne(id)
        return {
            status: true,
            message: "Успешно",
            data: entry
        }
    }

    @Get()
    async getEntries(
        @Query("offset") offset: number,
        @Query("limit") limit: number
    ): Promise<IResponseSuccess<Entry[]>> {
        const entries = await this.entryService.get(offset, limit)
        return {
            status: true,
            message: "Успешно",
            data: entries
        }
    }

    
    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteEntry(
        @Param("id", ParseIntPipe) entryID: number,
        @UserProperty("id") userID: number
    ): Promise<IResponseSuccess<void>> {
        await this.entryService.delete(entryID, userID)
        return {
            status: true,
            message: "Успешно"
        }
    }

    @Delete("delete-file/:id")
    @UseGuards(AuthGuard)
    async deleteFile(
        @Param("id", ParseIntPipe) entryID: number,
        @Body("path") pathFile: string
    ): Promise<IResponseSuccess<void>> {
        await this.entryService.deleteFile(entryID, pathFile)
        return {
            status: true,
            message: "Успешно"
        }
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor("files", 5))
    async updateEntry(
        @Body(new ValidationPipe()) updateEntityDto: CreateOrUpdateEntityDto,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @UserProperty("id") userID: number,
        @Param("id", ParseIntPipe) entryID: number
    ): Promise<IResponseSuccess<Entry>> {
        const updateEntry = await this.entryService.update(updateEntityDto, files, userID, entryID)
        return {
            status: true,
            message: "Успешно",
            data: updateEntry
        }
    }


    @Post("create")
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor("files", 5))
    async createEntry(
        @Body(new ValidationPipe()) createEntityDto: CreateOrUpdateEntityDto,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @UserProperty("id") userID: number
    ): Promise<IResponseSuccess<Entry>> {
        console.log(files)
        // 
        const newEntry = await this.entryService.create(createEntityDto, files, userID)
        return {
            status: true,
            message: "Успешно",
            data: newEntry
        }
    }
}