import { ApiProperty } from "@nestjs/swagger";

export class UpdateBorrowingDto {
    @ApiProperty({
        type: "string",
        description: "Borrowing's ID"
    })
    id: string;
}