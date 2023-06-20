import { Module } from "@nestjs/common";
import { BorrowingController } from "./borrowing.controller";
import { BorrowingService } from "./borrowing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Borrowing } from "src/database/entities/borrowing.entity";
import { Book } from "src/database/entities/book.entity";
import { User } from "src/database/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Borrowing, Book, User])],
    controllers: [BorrowingController],
    providers: [BorrowingService]
})
export class BorrowingModule { }