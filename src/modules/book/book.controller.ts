import { Body, Controller, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { UpdateBookDto } from "./dto/update-book.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import multer = require("multer");

@ApiTags("book")
@Controller("book")
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("create-book")
    @UseInterceptors(FileInterceptor("book", {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./public/book");
            },
            filename: function (req, file, cb) {
                const parts = file.originalname.split(".");
                const now = Date.now();
                let name: string = "";
                if (parts.length === 1) {
                    name = now + ".pdf";
                } else {
                    name = now + "." + parts[parts.length - 1];
                }
                cb(null, name);
            }
        })
    }))
    @UseInterceptors(FileInterceptor("image", {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./public/image")
            },
            filename: function (req, file, cb) {
                const parts = file.originalname.split(".");
                const now = Date.now();
                cb(null, now + "." + parts[parts.length - 1]);
            }
        })
    }))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        type: CreateBookDto
    })
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