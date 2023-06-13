import { Module } from "@nestjs/common";
import { BorrowingController } from "./borrowing.controller";
import { BorrowingService } from "./borrowing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Borrowing } from "src/database/entities/borrowing.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Borrowing])],
    controllers: [BorrowingController],
    providers: [BorrowingService]
})
export class BorrowingModule { }