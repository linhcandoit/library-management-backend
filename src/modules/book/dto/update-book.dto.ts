import { ApiProperty } from "@nestjs/swagger";

export class UpdateBookDto {
    @ApiProperty({
        type: "string"
    })
    id: string;

    @ApiProperty({
        type: "number"
    })
    remaining: number;
}