import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserDto{
    @ApiProperty({
        type: "string",
        description: "ID of the user you want to delete"
    })
    id: string;
}