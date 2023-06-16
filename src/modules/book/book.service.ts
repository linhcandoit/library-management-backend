import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "src/database/entities/book.entity";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dto/create-book.dto";
import { ROLE } from "src/shared/constant";
import { UpdateBookDto } from "./dto/update-book.dto";
import { DeleteBookDto } from "./dto/delete-book.dto";

@Injectable()
export class BookService {
    constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>) { }

    async createBook(user: User, files: { book?: Express.Multer.File, image?: Express.Multer.File }, data: CreateBookDto) {
        if (user.role !== ROLE.admin) {
            throw new HttpException("Don't have permission", HttpStatus.BAD_REQUEST);
        }

        const book = new Book();
        book.name = data.name;
        book.author = data.author;
        book.type = data.type;
        book.position = data.position;
        book.remaining = data.reamining;
        book.bookLink = files.book[0].filename;
        book.imageLink = files.image[0].filename;

        await this.bookRepository.save(book);

        return book;
    }

    async updateBook(user: User, data: UpdateBookDto) {
        console.log(user)
        if (user.role !== ROLE.admin) {
            throw new HttpException("Don't have permission", HttpStatus.BAD_REQUEST);
        }

        const book = await this.bookRepository.findOne({
            where: {
                id: data.id
            }
        });

        if (!book) {
            throw new HttpException("Invalid book's ID", HttpStatus.BAD_REQUEST);
        }

        book.remaining = data.remaining;

        await this.bookRepository.save(book);

        return book;
    }

    async getListBook() {
        const book = await this.bookRepository.find({});
        return book;
    }

    async deleteBook(user: User, data: DeleteBookDto) {
        if (user.role !== ROLE.admin) {
            throw new HttpException("Don't have permissions", HttpStatus.BAD_REQUEST);
        }

        const book = await this.bookRepository.findOne({
            where: {
                id: data.id
            }
        });

        if (!book) {
            throw new HttpException("Invalid book's ID", HttpStatus.BAD_REQUEST);
        }

        await this.bookRepository.remove(book);

        return book;
    }

}