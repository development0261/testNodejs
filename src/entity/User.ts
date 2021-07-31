import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

//to define user entity

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    phoneNumber: number;

}
