import { IProjectListResponse } from "../../../../Api/ProjectAPI/Interfaces/IProjectListResponse";

export interface IProject {
    fetchMethod: () => Promise<IProjectListResponse[]>;
}