import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public role : string;

    @Column()
    public bookBorrowed: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public faculty: string;

    @Column()
    public class: string;
}