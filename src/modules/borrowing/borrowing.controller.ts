import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { BorrowingService } from "./borrowing.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { CreateBorrowingDto } from "./dto/create-borrowing.dto";
import { UpdateBorrowingDto } from "./dto/update-borrowing.dto";
import { DeleteBorrowingDto } from "./dto/delete-borrowing.dto";

@ApiTags("borrowing")
@Controller("borrowing")
export class BorrowingController {
    constructor(private readonly borrowingService: BorrowingService) { }

    @Post("create-borrowing")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async createBorrowing(@Req() request, @Body() data: CreateBorrowingDto) {
        const dataReturn = this.borrowingService.createBorrowing(request.user, data);
        return dataReturn;
    }

    @Get("list-borrowing")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getListBorrowing(@Req() request) {
        const dataReturn = this.borrowingService.getListBorrowing(request.user);
        return dataReturn;
    }

    @Put("update-borrowing")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async updateBorrowing(@Req() request, @Body() data: UpdateBorrowingDto) {
        const dataReturn = this.borrowingService.updateBorrowing(request.user, data);
        return dataReturn;
    }

    @Delete("delete-borrowing")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deleteBorrowing(@Req() request, @Body() data: DeleteBorrowingDto) {
        const dataReturn = this.borrowingService.deleteBorrowing(request.user, data);
        return dataReturn;
    }
}