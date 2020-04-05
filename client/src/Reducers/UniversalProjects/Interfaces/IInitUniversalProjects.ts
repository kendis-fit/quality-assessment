import { INIT_UNIVERSAL_PROJECTS } from "../../../Constants/actions";
import { IProjectListResponse } from "../../../Api/ProjectAPI/Interfaces/IProjectListResponse";

export interface IInitUniversalProjects {
    type: typeof INIT_UNIVERSAL_PROJECTS;
    value: IProjectListResponse[];
}