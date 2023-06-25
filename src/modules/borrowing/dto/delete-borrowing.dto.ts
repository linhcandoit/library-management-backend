import { ApiProperty } from "@nestjs/swagger";

export class DeleteBorrowingDto {
    @ApiProperty({
        type: "string",
        description: "Borrowing's ID"
    })
    id: string;
}