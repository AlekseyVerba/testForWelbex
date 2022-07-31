import { TypeOrmModule } from "@nestjs/typeorm"

export const ormConfiguration = TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "blog",
    synchronize: true,
    autoLoadEntities: true,
    // ssl: {
    //     rejectUnauthorized: false
    // }
})


// host: "ec2-34-235-31-124.compute-1.amazonaws.com",
// port: 5432,
// username: "lyidclebtabpxy",
// password: "1c5b3106cd10b8cd3bf5fd1671558970643d9ccbba16d159c18173624f22227e",
// database: "d32q922o779djt",

