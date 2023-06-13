import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Borrowing } from "./borrowing.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public role: string;

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

    @OneToMany(() => Borrowing, (borrowing) => borrowing.user)
    public borrowings: Borrowing[];
}