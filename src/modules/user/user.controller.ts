import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { Request } from "express";

@ApiTags("user")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("create-user")
    async createUser(@Req() request, @Body() data: CreateUserDto) {
        const dataReturn = this.userService.createUser(request.user, data);
        return dataReturn;
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get("get-list-user")
    async getListuser() {
        const dataReturn = this.userService.getListUser();
        return dataReturn;
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get("get-info-user")
    getInfoUser(@Req() request) {
        const dataReturn = this.userService.getInfoUser(request.user);
        return dataReturn;
    }
}