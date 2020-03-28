import { ApiProperty } from "@nestjs/swagger";

export class DiagramProfile {
    @ApiProperty()
    public nameIndex: string;
    
    @ApiProperty()
    public value: number;

    public constructor({ nameIndex, value }: DiagramProfile) {
        this.nameIndex = nameIndex;
        this.value = value;
    }
}