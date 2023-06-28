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

    @Column({
        nullable : true
    })
    public dateReturned: string;

    @Column()
    public status: string; // enum BORROWING_STATUS

    @ManyToOne(() => User, (user) => user.borrowings)
    public user: User;

    @ManyToOne(() => Book, (book) => book.borrowings)
    public book: Book;
}