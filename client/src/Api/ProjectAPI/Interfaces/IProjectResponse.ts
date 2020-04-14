export interface IProjectResponse {
    id: string;
    name: string;
    children: IProjectResponse[];
}