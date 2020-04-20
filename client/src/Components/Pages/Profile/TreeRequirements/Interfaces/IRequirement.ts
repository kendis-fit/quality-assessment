import { IProjectResponse } from "../../../../../Api/ProjectAPI/Interfaces/IProjectResponse";

export interface IRequirement extends IProjectResponse {
    addRequirement: (parentId: string) => void;
    removeRequirement: (id: string) => void;
    selectRequirement: (id: string) => void;
}