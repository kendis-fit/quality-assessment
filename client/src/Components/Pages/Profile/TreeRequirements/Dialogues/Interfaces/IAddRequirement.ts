import { IProjectResponse } from "../../../../../../Api/ProjectAPI/Interfaces/IProjectResponse";

export interface IAddRequirement {
    parentId: string;
    handleClose: () => void;
    onCreatedElement: (element: IProjectResponse) => void;
}