import IShowAlert from "../Reducers/Alert/Interfaces/IShowAlert";
import ICloseAlert from "../Reducers/Alert/Interfaces/ICloseAlert";

import { IAddUniversalProject } from "../Reducers/UniversalProjects/Interfaces/IAddUniversalProject";
import { IInitUniversalProjects } from "../Reducers/UniversalProjects/Interfaces/IInitUniversalProjects";
import { IRemoveUniversalProject } from "../Reducers/UniversalProjects/Interfaces/IRemoveUniversalProject";

export type AlertActions = IShowAlert | ICloseAlert;
export type UniversalProjectsActions = IAddUniversalProject | IInitUniversalProjects | IRemoveUniversalProject;