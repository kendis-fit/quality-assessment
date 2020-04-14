export interface IProjectResponse {
    id: string;
    name: string;
    requirements: IProjectResponse[];
}