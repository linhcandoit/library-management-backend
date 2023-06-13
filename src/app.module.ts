import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './database/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { Book } from './database/entities/book.entity';
import { BookModule } from './modules/book/book.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Borrowing } from './database/entities/borrowing.entity';
import { BorrowingModule } from './modules/borrowing/borrowing.module';

@Module({
  imports: [AuthModule, UserModule, BookModule, BorrowingModule, TypeOrmModule.forRoot({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Tuanlinh12@",
    database: "libraryDB",
    entities: [User, Book, Borrowing],
    synchronize: true,
    extra: {
      trustServerCertificate: true,
    }
  }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    })],
})
export class AppModule { }
