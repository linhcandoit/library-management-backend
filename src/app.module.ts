import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './database/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { Book } from './database/entities/book.entity';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [AuthModule, UserModule, BookModule, TypeOrmModule.forRoot({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Tuanlinh12@",
    database: "libraryDB",
    entities: [User, Book],
    synchronize: true,
    extra: {
      trustServerCertificate: true,
    }
  })],
})
export class AppModule { }
