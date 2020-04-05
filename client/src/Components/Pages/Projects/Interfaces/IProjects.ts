import { IProjectListResponse } from "../../../../Api/ProjectAPI/Interfaces/IProjectListResponse";

export interface IProjects {
    projects: IProjectListResponse[];
    universalProjects: IProjectListResponse[];
}