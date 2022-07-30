import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from "typeorm"
import { hashSync } from "bcryptjs"
import { Entry } from "../entry/entry.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string

    @Column({
        select: false
    })
    password: string

    @OneToMany(() => Entry, (entry) => entry.user)
    entries: Entry[]

    @BeforeInsert()
    hashPassword(): void {
        this.password = hashSync(this.password, 8)
    }

}