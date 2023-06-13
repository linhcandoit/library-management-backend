import { ApiProperty } from "@nestjs/swagger";

export class DeleteBookDto {
    @ApiProperty({
        type: "string",
        description: "ID of the book you want to delete"
    })
    id : string;
}