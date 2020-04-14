import { ApiProperty } from "@nestjs/swagger";

export class CheckProject {
    @ApiProperty()
    public isMultiple: boolean;
    
    public constructor({ isMultiple }: CheckProject) {
        this.isMultiple = isMultiple;
    }
}