import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { BorrowingService } from "./borrowing.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { BorrowBookDto } from "./dto/borrow-book.dto";

@ApiTags("borrowing")
@Controller("borrowing")
export class BorrowingController {
    constructor(private readonly borrowingService: BorrowingService) { }

    @Post("borrow-book")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async borrowBook(@Req() request, @Body() data: BorrowBookDto){
        const dataReturn = this.borrowingService.borrowBook(request.user, data);
        return dataReturn;
    }

    @Get("list-borrowing")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getListBorrowing(@Req() request){
        const dataReturn = this.borrowingService.getListBorrowing(request.user);
        return dataReturn;
    }
}