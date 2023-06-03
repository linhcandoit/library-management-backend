import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { UpdateBookDto } from "./dto/update-book.dto";

@ApiTags("book")
@Controller("book")
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("create-book")
    async createBook(@Req() request, @Body() data: CreateBookDto) {
        const dataReturn = this.bookService.createBook(request.user, data);
        return dataReturn;
    }

    @Put("update-book")
    async updateBook(@Req() request, @Body() data: UpdateBookDto) {
        const dataReturn = this.bookService.updateBook(request.user, data);
        return dataReturn;
    }

}