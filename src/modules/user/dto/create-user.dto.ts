import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        type: "string"
    })
    id: string;

    @ApiProperty({
        type: "string"
    })
    name: string;

    @ApiProperty({
        type: "string"
    })
    email: string;

    @ApiProperty({
        type: "string"
    })
    faculty: string;

    @ApiProperty({
        type: "string"
    })
    class: string;

    @ApiProperty({
        type: "string",
        enum: ["user", "admin"]
    })
    role: string;
}