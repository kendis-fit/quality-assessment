import { BaseAPI } from "../BaseAPI";
import { ICreateProject } from "./Interfaces/ICreateProject";
import { ServerError } from "../Errors/ServerError/ServerError";
import { IIndex } from "../../Components/Pages/Profile/Interfaces/IIndex";
import { IServerError } from "../Errors/ServerError/Interfaces/IServerError";
import { IDiagramResponse } from "../ProjectAPI/Interfaces/IDiagramResponse";
import { IUniversalProjectResponse } from "./Interfaces/IUniversalProjectResponse";
import { IProjectListResponse } from "../ProjectAPI/Interfaces/IProjectListResponse";
import { IResultIndexResponse } from "../ProjectAPI/Interfaces/IResultIndexResponse";
import { ICreatedProjectResponse } from "../ProjectAPI/Interfaces/ICreatedProjectResponse";

export class UniversalProjectAPI extends BaseAPI {
    public constructor(token: string) {
        super(token);
    }

    public create(project: ICreateProject): Promise<ICreatedProjectResponse> {
        return new Promise<ICreatedProjectResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/universal-projects`, {
                    method: "POST",
                    body: JSON.stringify(project),
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
                    const error: ServerError = new ServerError("", result);
                    reject(error);
                }
            } catch {
                reject(ServerError.createInternalError());
            }
        });
    }

    public findAll(offset: number = 0, size: number = 100): Promise<IProjectListResponse[]> {
        return new Promise<IProjectListResponse[]>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/universal-projects?offset=${offset}&size=${size}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IProjectListResponse[] = await response.json();
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

    public findById(id: number): Promise<IUniversalProjectResponse> {    
        return new Promise<IUniversalProjectResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/universal-projects/${id}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IUniversalProjectResponse = await response.json();
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

    public getResultIndex(id: string, nameIndex: string): Promise<IResultIndexResponse> {
        return new Promise<IResultIndexResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/universal-projects/${id}/indexes/${nameIndex}`, {
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

    public getDiagram(id: string, nameIndex: string): Promise<IDiagramResponse> {
        return new Promise<IDiagramResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/universal-projects/${id}/diagrams/${nameIndex}`, {
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

    public update(id: number, profile: IIndex[]): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/universal-projects/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(profile),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    resolve(true);
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

    public delete(id: number): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${process.env.REACT_APP_API}/universal-projects/${id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    resolve(true);
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