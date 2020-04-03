export interface IProjectResponse {
    id: number;
    name: string;
    parentId: string | null;
    requirements: IProjectResponse[];
}