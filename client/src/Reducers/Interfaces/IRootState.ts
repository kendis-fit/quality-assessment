import IAlert from "../Alert/Interfaces/IAlert";
import { IProjectListResponse } from "../../Api/ProjectAPI/Interfaces/IProjectListResponse";

export default interface IRootState {
    Alert: IAlert;
    UniversalProjects: IProjectListResponse[];
}