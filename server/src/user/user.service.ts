import { ConflictException, Injectable } from "@nestjs/common"
import { User } from "./user.entity"
import { Repository } from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
import { IResponseFail } from "src/types/response/index.interface";
import { ICreateUser, IUser } from "./user.interface"

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser({ name, password }: ICreateUser): Promise<IUser> {
        const candidateUser = await this.userRepository.findOne({where: {name}, select: {id: true}})
        
        if (candidateUser) {
            const objError: IResponseFail = {
                status: false,
                message: "Пользователь с данным name уже существует"
            }

            throw new ConflictException(objError)
        }

        const newUser = Object.assign(new User(),{name, password}) 
        return await this.userRepository.save(newUser)
    }  


    async findUserByEmailWithPassword(name: string): Promise<User> {
        return await this.userRepository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.name = :name", {name})
        .getOne()
    }

    async findUserByID(id: number): Promise<IUser> {
        return await this.userRepository.findOne({where: {id}})
    }

    removePassword(user: User): IUser{
        const userNew = JSON.parse(JSON.stringify({...user}))
        delete userNew.password
        userNew as IUser
        return userNew
    }
}