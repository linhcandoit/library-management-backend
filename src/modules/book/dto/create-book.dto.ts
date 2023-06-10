import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty({
        type: "string"
    })
    name: string;

    @ApiProperty({
        type: "string"
    })
    author: string;

    @ApiProperty({
        type: "string"
    })
    type: string;

    @ApiProperty({
        type: "string"
    })
    position: string;

    @ApiProperty({
        type: "number"
    })
    reamining: number;

    @ApiProperty({
        type: "string",
        format: "binary"
    })
    book: any;

    @ApiProperty({
        type: "string",
        format: "binary"
    })
    image: any;
}