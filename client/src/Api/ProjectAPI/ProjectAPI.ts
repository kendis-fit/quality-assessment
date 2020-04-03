import BaseAPI from "../BaseAPI";
import ServerError from "../Errors/ServerError";
import IServerError from "../Interfaces/IServerError";
import { IProjectResponse } from "./Interfaces/IProjectResponse";
import { IDiagramResponse } from "./Interfaces/IDiagramResponse";
import { IProjectListResponse } from "./Interfaces/IProjectListResponse";
import { IResultIndexResponse } from "./Interfaces/IResultIndexResponse";
import { ICreatedProjectResponse } from "./Interfaces/ICreatedProjectResponse";

export class ProjectAPI extends BaseAPI {
    public constructor(token: string) {
        super(token);
    }

    public createProject(name: string): Promise<ICreatedProjectResponse> {
        return new Promise<ICreatedProjectResponse>(async (resolve, reject) => {
            try {
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
                } else if (response.status === 403 || response.status === 500) {
                    reject(ServerError.createError(response.status));
                } else {
                    const result: IServerError = await response.json();
                    const error: ServerError = new ServerError(`Server error while fetching ${process.env.REACT_APP_API}/projects`, result);
                    reject(error);
                }
            } catch {
                reject(ServerError.createInternalError());
            }
        });
    }

    public getAllProjects(offset: number = 0, size: number = 100): Promise<IProjectListResponse[]> {
        return new Promise<IProjectListResponse[]>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/projects?offset=${offset}&size=${size}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IProjectListResponse[] = await response.json();
                    resolve(result);
                } else if (response.status === 403 || response.status === 500) {
                    reject(ServerError.createError(response.status));
                } else {
                    const result: IServerError = await response.json();
                    const error: ServerError = new ServerError(`Server error while fetching ${process.env.REACT_APP_API}/projects?offset=${offset}&size=${size}`, result);
                    reject(error);
                }
            } catch {
                reject(ServerError.createInternalError());
            }
        });
    }

    public getProjectById(id: number): Promise<IProjectResponse> {    
        return new Promise<IProjectResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/projects/${id}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IProjectResponse = await response.json();
                    resolve(result);
                } else if (response.status === 403 || response.status === 500) {
                    reject(ServerError.createError(response.status));
                } else {
                    const result: IServerError = await response.json();
                    const error: ServerError = new ServerError(`Server error while fetching ${process.env.REACT_APP_API}/projects/${id}`, result);
                    reject(error);
                }
            } catch {
                reject(ServerError.createInternalError());
            }
        });
    }

    public getResultIndexByProject(id: string, nameIndex: string): Promise<IResultIndexResponse> {
        return new Promise<IResultIndexResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/projects/${id}/indexes/${nameIndex}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IResultIndexResponse = await response.json();
                    resolve(result);
                } else if (response.status === 403 || response.status === 500) {
                    reject(ServerError.createError(response.status));
                } else {
                    const result: IServerError = await response.json();
                    const error: ServerError = new ServerError("", result);
                    reject(error);
                }
            } catch {
                reject(ServerError.createInternalError());
            }
        }); 
    }

    public getDiagramByProject(id: string, nameIndex: string): Promise<IDiagramResponse> {
        return new Promise<IDiagramResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/projects/${id}/diagrams/${nameIndex}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IDiagramResponse = await response.json();
                    resolve(result);
                } else if (response.status === 403 || response.status === 500) {
                    reject(ServerError.createError(response.status));
                } else {
                    const result: IServerError = await response.json();
                    const error: ServerError = new ServerError("", result);
                    reject(error);
                }
            } catch {
                reject(ServerError.createInternalError());
            }
        }); 
    }
}