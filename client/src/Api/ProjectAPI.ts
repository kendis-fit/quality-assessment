import BaseAPI from "./BaseAPI";
import ServerError from "./Interfaces/ServerError";
import IServerError from "./Interfaces/IServerError";
import { IProjectResponse } from "./Interfaces/IProjectResponse";
import { IProjectListResponse } from "./Interfaces/IProjectListResponse";
import { ICreatedProjectResponse } from "./Interfaces/ICreatedProjectResponse";

export class ProjectAPI extends BaseAPI {
    public constructor(token: string) {
        super(token);
    }

    public CreateProject(name: string): Promise<ICreatedProjectResponse> {
        return new Promise<ICreatedProjectResponse>(async (resolve, reject) => {
            const response = await this.fetch(`${process.env.REACT_APP_API}/projects`, {
                method: "POST",
                body: JSON.stringify({ name }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const result: ICreatedProjectResponse = await response.json();
                resolve(result);
            } else {
                const result: IServerError = await response.json();
                const error: ServerError = new ServerError(`Server error while fetching ${process.env.REACT_APP_API}/projects`, result);
                reject(error);
            }
        });
    }

    public GetAllProjects(offset: number = 0, size: number = 100): Promise<IProjectListResponse[]> {
        return new Promise<IProjectListResponse[]>(async (resolve, reject) => {
            const response = await this.fetch(`${process.env.REACT_APP_API}/projects?offset=${offset}&size=${size}`, {
                method: "GET"
            });
            if (response.ok) {
                const result: IProjectListResponse[] = await response.json();
                resolve(result);
            } else {
                const result: IServerError = await response.json();
                const error: ServerError = new ServerError(`Server error while fetching ${process.env.REACT_APP_API}/projects?offset=${offset}&size=${size}`, result);
                reject(error);
            }
        });
    }

    public GetProjectById(id: number): Promise<IProjectResponse> {    
        return new Promise<IProjectResponse>(async (resolve, reject) => {
            const response = await this.fetch(`${process.env.REACT_APP_API}/projects/${id}`, {
                method: "GET"
            });
            if (response.ok) {
                const result: IProjectResponse = await response.json();
                resolve(result);
            } else {
                const result: IServerError = await response.json();
                const error: ServerError = new ServerError(`Server error while fetching ${process.env.REACT_APP_API}/projects/${id}`, result);
                reject(error);
            }
        });
    }
}