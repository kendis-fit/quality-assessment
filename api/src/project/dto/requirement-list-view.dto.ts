import { StatusModificate } from "src/requirement/requirement.enum";

export class RequirementListView {

    public id: number;
    
    public name: string;

    public statusModificate: StatusModificate;

    public constructor({ id, name, statusModificate }: RequirementListView) {
        this.id = id;
        this.name = name;
        this.statusModificate = statusModificate;
    }
}