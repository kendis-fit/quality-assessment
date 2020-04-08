import { ICreateProject } from "./ICreateProject";

export interface IDialogCreateProject {
    open: boolean;
    handleClose: () => void;
    createProject: (project: ICreateProject) => void;
}