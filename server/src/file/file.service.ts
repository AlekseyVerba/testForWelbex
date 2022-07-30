import { Injectable, InternalServerErrorException } from "@nestjs/common"
import * as path from "path"
import * as fs from "fs"
import { nameDirFiles } from "../constants/index"
import { v4 } from "uuid"
import { IResponseFail } from "../types/response/index.interface"
import { Express } from "express"
import { Multer } from 'multer';

@Injectable()
export class FileService {

    createFile(file: Express.Multer.File): string {
        const typeFile = file.originalname.split(".").slice(-1).pop()
        const pathDir = path.join(__dirname, "..", nameDirFiles, typeFile)

        if (!fs.existsSync(pathDir)) {
            fs.mkdirSync(pathDir, {recursive: true});
        }

        const nameFile = `${v4()}.${typeFile}`
        const fullPathFile = path.join(pathDir, nameFile)

        try {
            fs.writeFileSync(fullPathFile, file.buffer)
        } catch(e) {
            const objError: IResponseFail = {
                status: false,
                message: "Ошибка создания файла"
            }
            throw new InternalServerErrorException(objError)
        }

        return `${typeFile}/${nameFile}`
    }

    async deleteFile(pathFile: string): Promise<boolean> {
        try {

            const fullPath = path.join(__dirname, "..", nameDirFiles, pathFile)


            if (!fs.existsSync(fullPath)) {
                const objError: IResponseFail = {
                    status: false,
                    message: "Не найден файл по заданному пути"
                }
                throw new InternalServerErrorException(objError)
            }

            console.log(fullPath)

            fs.unlinkSync(fullPath)

            return true

        } catch(e) {
            const objError: IResponseFail = {
                status: false,
                message: "Ошибка при удалении файла"
            }
            throw new InternalServerErrorException(objError)
        }
    }

}