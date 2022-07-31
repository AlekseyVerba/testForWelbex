import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm"
import { Entry } from "./entry.entity"
import { UserService } from "../user/user.service"
import { FileService } from "../file/file.service"
import { CreateOrUpdateEntityDto } from "./dto/createEntity.dto"
import { IResponseFail } from "../types/response/index.interface"
import { Express } from "express"
import { Multer } from 'multer';

@Injectable()
export class EntryService {

    constructor(
        @InjectRepository(Entry)
        private entryRepository: Repository<Entry>,
        private userService: UserService,
        private fileService: FileService
    ) {}


    async create(
        createEntityDto: CreateOrUpdateEntityDto,
        files: Array<Express.Multer.File>,
        userID: number
    ): Promise<Entry> {

        let filesPath: string[] = []

        if (files) {
            try {
                filesPath = files.map(this.fileService.createFile)
            } catch(e) {

            }
        }

        const newEntry = Object.assign(new Entry(), createEntityDto, {files: filesPath, user: userID})

        return await this.entryRepository.save(newEntry)
    }
    
    async update(
        createEntityDto: CreateOrUpdateEntityDto,
        files: Array<Express.Multer.File>,
        userID: number,
        entryID: number
    ):Promise<Entry> {

        const entry = await this.entryRepository
        .createQueryBuilder("entry")
        .where("entry.id = :id", {id: entryID})
        .andWhere("entry.user = :userID", {userID})
        .getOne()

        if (!entry) {
            const objError: IResponseFail = {
                message: "Не найдена запись, либо у вас нету прав",
                status: false
            }
            throw new NotFoundException(objError)
        }

        let filesPath: string[] = []

        if (files) {
            try {
                filesPath = files.map(this.fileService.createFile)
            } catch(e) {}
        }

        entry.files = [...entry.files, ...filesPath]

        const updateEntity = Object.assign(entry, createEntityDto)
        return await this.entryRepository.save(updateEntity)

    }

    async delete(entryID: number, userID: number): Promise<boolean> {
        const entry = await this.entryRepository
        .createQueryBuilder("entry")
        .where("entry.id = :id", {id: entryID})
        .andWhere("entry.user = :userID", {userID})
        .getOne()

        if (!entry) {
            const objError: IResponseFail = {
                message: "Не найдена запись, либо у вас нету прав",
                status: false
            }
            throw new NotFoundException(objError)
        }

        if (entry.files.length > 0) {
            try {
                entry.files.forEach(this.fileService.deleteFile)
            } catch(e) {}
        }

        await this.entryRepository.delete(entry.id)
        return true

    }

    async get(offset: number = 0, limit: number = 10): Promise<Entry[]> {
        const entries = await this.entryRepository
                    .createQueryBuilder("entry")
                    .leftJoinAndSelect("entry.user", "user")
                    .limit(limit)
                    .offset(offset)
                    .orderBy("entry.createdAt", "DESC")
                    .getMany()
        return entries
    }

    async getOne(id: number): Promise<Entry> {
        const entry = await this.entryRepository
                    .createQueryBuilder("entry")
                    .leftJoinAndSelect("entry.user", "user")
                    .where("entry.id = :id", {id})
                    .getOne()

        if (!entry) {
            const objError:IResponseFail = {
                status: false,
                message: "Пост не найден",
            }
            throw new NotFoundException(objError)
        }


        return entry
    }

    async deleteFile(id: number, path: string): Promise<boolean> {
        const entry = await this.entryRepository.findOne({where: {id}})

        const { files } = entry

        if (!files.includes(path)) {
            const objError:IResponseFail = {
                status: false,
                message: "Файл не найден"
            }

            throw new NotFoundException(objError)
        }

        this.fileService.deleteFile(path)

        const updateFiles = files.filter(file => file !== path)
        entry.files = updateFiles

        await this.entryRepository.save(entry)
        return true
    }
}
