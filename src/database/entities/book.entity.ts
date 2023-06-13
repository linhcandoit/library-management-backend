import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Borrowing } from "./borrowing.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public remaining: number;

    @Column()
    public name: string;

    @Column()
    public author: string;

    @Column()
    public type: string;

    @Column()
    public position: string;

    @Column()
    public bookLink: string;

    @Column()
    public imageLink: string;

    @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
    public borrowings: Borrowing[];
}