import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "../user/user.entity"

@Entity()
export class Entry {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: ""})
    message: string

    @Column("text", {array: true})
    files: string[]

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.entries)
    user: User

}