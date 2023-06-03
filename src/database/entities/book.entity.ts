import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}