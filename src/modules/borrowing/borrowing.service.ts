import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "src/database/entities/book.entity";
import { Borrowing } from "src/database/entities/borrowing.entity";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { A_MONTH_TIME, ROLE } from "src/shared/constant";
import moment from "moment";
import { BorrowBookDto } from "./dto/borrow-book.dto";

@Injectable()
export class BorrowingService {
    constructor(
        @InjectRepository(Borrowing) private readonly borrowingRepository: Repository<Borrowing>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>
    ) { }

    async borrowBook(user: User, data: BorrowBookDto) {
        if (user.role !== ROLE.admin) {
            throw new HttpException("Don't have permissions", HttpStatus.BAD_REQUEST);
        }

        const student = await this.userRepository.findOne({
            where: {
                id: data.userId
            }
        });

        const book = await this.bookRepository.findOne({
            where: {
                id: data.bookId
            }
        });

        const borrowing = new Borrowing();

        borrowing.user = student;
        borrowing.book = book;
        borrowing.dateBorrowed = new Date(Date.now());
        borrowing.dateExpired = new Date(Date.now() + 3 * A_MONTH_TIME);

        await this.borrowingRepository.save(borrowing);

        return borrowing;
    }

    async getListBorrowing(user: User) {
        let condition = {};

        if (user.role === ROLE.user) {
            condition["userId"] = user.id;
        }

        let borrowings = null;

        if (Object.keys(condition).length === 0) {
            borrowings = await this.borrowingRepository.find();
        } else {
            borrowings = await this.borrowingRepository.find({
                where: condition
            });
        }
        return borrowings;
    }
}