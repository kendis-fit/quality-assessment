export interface IProjectResponse {
    id: string;
    name: string;
    parentId: string | null;
    requirements: IProjectResponse[];
}