import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot({
    type: "mssql",
    host: "localhost",
    port: 3306,
    username: "sa",
    password: "sa",
    database: "test",
    entities: [User],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
