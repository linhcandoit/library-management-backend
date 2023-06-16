import { Body, Controller, Delete, Get, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { UpdateBookDto } from "./dto/update-book.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import multer = require("multer");
import { DeleteBookDto } from "./dto/delete-book.dto";

@ApiTags("book")
@Controller("book")
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("create-book")
    @UseInterceptors(FileFieldsInterceptor([
        { name: "book", maxCount: 1 },
        { name: "image", maxCount: 1 }
    ], {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                if (file.fieldname === "book") {
                    cb(null, "./public/book");
                } else if (file.fieldname === "image") {
                    cb(null, "./public/image");
                }
            },
            filename: function (req, file, cb) {
                const parts = file.originalname.split(".");
                let name: string = "";
                const now = Date.now();
                if (parts.length === 1) {
                    name = now + ".pdf";
                } else {
                    name = now + "." + parts[parts.length - 1];
                }
                cb(null, name);
            }
        })
    }
    ))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        type: CreateBookDto
    })
    async createBook(@Req() request, @UploadedFiles() files: { book?: Express.Multer.File, image?: Express.Multer.File }, @Body() data: CreateBookDto) {
        const dataReturn = this.bookService.createBook(request.user, files, data);
        return dataReturn;
    }

    @Put("update-book")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async updateBook(@Req() request, @Body() data: UpdateBookDto) {
        const dataReturn = this.bookService.updateBook(request.user, data);
        return dataReturn;
    }

    @Get("list-book")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getListBook() {
        const dataReturn = this.bookService.getListBook();
        return dataReturn;
    }

    @Delete("delete-book")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deleteBook(@Req() request, @Body() data: DeleteBookDto) {
        const dataReturn = this.bookService.deleteBook(request.user, data);
        return dataReturn;
    }

}