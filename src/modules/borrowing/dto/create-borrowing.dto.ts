import { ApiProperty } from "@nestjs/swagger";

export class CreateBorrowingDto {
    @ApiProperty({
        type: "string",
        description: "User's ID"
    })
    userId: string;

    @ApiProperty({
        type: "string",
        description: "Book's ID"
    })
    bookId: string;
}