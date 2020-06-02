import { IProjectResponse } from "../../../../../Api/ProjectAPI/Interfaces/IProjectResponse";

export interface IRequirement extends IProjectResponse {
    selectRequirement: (id: string) => void;
    removeRequirement: (id: string, name: string) => void;
    addRequirement: (id: string, name: string) => void;
}