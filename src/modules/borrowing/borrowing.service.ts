import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "src/database/entities/book.entity";
import { Borrowing } from "src/database/entities/borrowing.entity";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { BORROWING_STATUS, ROLE } from "src/shared/constant";
import { UpdateBorrowingDto } from "./dto/update-borrowing.dto";
import { CreateBorrowingDto } from "./dto/create-borrowing.dto";
import { DeleteBorrowingDto } from "./dto/delete-borrowing.dto";

const moment = require("moment")

@Injectable()
export class BorrowingService {
    constructor(
        @InjectRepository(Borrowing) private readonly borrowingRepository: Repository<Borrowing>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>
    ) { }

    async createBorrowing(user: User, data: CreateBorrowingDto) {
        if (user.role !== ROLE.admin) {
            throw new HttpException("Don't have permissions", HttpStatus.BAD_REQUEST);
        }

        const student = await this.userRepository.findOne({
            where: {
                id: data.userId
            }
        });

        if (student.bookBorrowed === 0) {
            throw new HttpException("Can not bororw book", HttpStatus.BAD_REQUEST);
        }

        const book = await this.bookRepository.findOne({
            where: {
                id: data.bookId
            }
        });

        const borrowing = new Borrowing();

        borrowing.user = student;
        borrowing.book = book;
        borrowing.dateBorrowed = moment().format("DD-MM-YYYY");
        borrowing.dateExpired = moment().add(3, "M").format("DD-MM-YYYY");
        borrowing.status = BORROWING_STATUS.borrowed;

        await this.borrowingRepository.save(borrowing);

        student.bookBorrowed--;

        await this.userRepository.save(student);

        return borrowing;
    }

    async getListBorrowing(user: User) {
        let borrowings: Borrowing[];

        if (user.role === ROLE.admin) {
            // get all the borrowing information
            borrowings = await this.borrowingRepository
                .createQueryBuilder("borrowing")
                .innerJoinAndSelect("borrowing.user", "user")
                .innerJoinAndSelect("borrowing.book", "book")
                .getMany();
        } else {
            borrowings = await this.borrowingRepository
                .createQueryBuilder("borrowing")
                .innerJoinAndSelect("borrowing.user", "user")
                .innerJoinAndSelect("borrowing.book", "book")
                .where("borrowing.user = :userId", { userId: user.id })
                .getMany();
        }
        return borrowings;
    }

    async updateBorrowing(user: User, data: UpdateBorrowingDto) {
        let borrowing: Borrowing;
        try {
            borrowing = await this.borrowingRepository.findOne({
                where: {
                    id: data.id
                }
            });
        } catch (error) {
            throw new HttpException("Invalid borrowing's ID", HttpStatus.BAD_REQUEST);
        }

        borrowing.dateBorrowed = moment().format("DD-MM-YYYY");
        borrowing.dateExpired = moment().add(3, "M").format("DD-MM-YYYY");

        await this.borrowingRepository.save(borrowing);

        return borrowing;
    }

    async deleteBorrowing(user: User, data: DeleteBorrowingDto) {
        if (user.role !== ROLE.admin) {
            throw new HttpException("Don't have permissions", HttpStatus.BAD_REQUEST);
        }

        let borrowing: Borrowing;

        try {
            borrowing = await this.borrowingRepository
                .createQueryBuilder("borrowing")
                .innerJoinAndSelect("borrowing.user", "user")
                .where("borrowing.id = :borrowingId", { borrowingId: data.id })
                .getOne();
        } catch (error) {
            throw new HttpException("Invalid borrowing's ID", HttpStatus.BAD_REQUEST);
        }

        const student = await this.userRepository.findOne({
            where: {
                id: borrowing.user.id
            }
        });

        student.bookBorrowed++;

        await this.userRepository.save(student);

        borrowing.status = BORROWING_STATUS.returned;
        borrowing.dateReturned = moment().format("YYYY-MM-DD");

        await this.borrowingRepository.save(borrowing);

        return "successful";
    }

}