import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity()
export class Borrowing {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public dateBorrowed: string;

    @Column()
    public dateExpired: string;

    @ManyToOne(() => User, (user) => user.borrowings)
    public user: User;

    @ManyToOne(() => Book, (book) => book.borrowings)
    public book: Book;
}