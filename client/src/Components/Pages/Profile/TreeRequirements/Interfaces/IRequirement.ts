import { IProjectResponse } from "../../../../../Api/ProjectAPI/Interfaces/IProjectResponse";

export interface IRequirement extends IProjectResponse {
    selectRequirement: (id: string, name: string, element: any) => void;
}