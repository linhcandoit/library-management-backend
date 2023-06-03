import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './database/entities/user.entity';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Tuanlinh12@",
    database: "libraryDB",
    entities: [User],
    synchronize : true,
    extra: {
      trustServerCertificate: true,
    }
  })],
})
export class AppModule { }
