import { ADD_UNIVERSAL_PROJECT } from "../../../Constants/actions";
import { IProjectListResponse } from "../../../Api/ProjectAPI/Interfaces/IProjectListResponse";

export interface IAddUniversalProject {
    type: typeof ADD_UNIVERSAL_PROJECT;
    value: IProjectListResponse;
}