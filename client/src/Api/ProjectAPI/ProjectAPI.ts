import { BaseAPI } from "../BaseAPI";
import { ServerError } from "../Errors/ServerError";
import { IProjectResponse } from "./Interfaces/IProjectResponse";
import { IDiagramResponse } from "./Interfaces/IDiagramResponse";
import { IProjectListResponse } from "./Interfaces/IProjectListResponse";
import { IResultIndexResponse } from "./Interfaces/IResultIndexResponse";
import { IServerError } from "../Errors/ServerError/Interfaces/IServerError";
import { ICreatedProjectResponse } from "./Interfaces/ICreatedProjectResponse";

export class ProjectAPI extends BaseAPI {
    public constructor(token: string) {
        const url = `${process.env.REACT_APP_API}/projects`;
        super(token, url);
    }

    public create(name: string): Promise<ICreatedProjectResponse> {
        return new Promise<ICreatedProjectResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(this.url, {
                    method: "POST",
                    body: JSON.stringify({ name }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const result: ICreatedProjectResponse = await response.json();
                    resolve(result);
                } else if (this.isUsualError(response.status)) {
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
                const response = await this.fetch(`${this.url}?offset=${offset}&size=${size}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IProjectListResponse[] = await response.json();
                    resolve(result);
                } else if (this.isUsualError(response.status)) {
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

    public findById(id: number): Promise<IProjectResponse> {    
        return new Promise<IProjectResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IProjectResponse = await response.json();
                    resolve(result);
                } else if (this.isUsualError(response.status)) {
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
                const response = await this.fetch(`${this.url}/${id}/indexes/${nameIndex}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IResultIndexResponse = await response.json();
                    resolve(result);
                } else if (this.isUsualError(response.status)) {
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
                const response = await this.fetch(`${this.url}/${id}/diagrams/${nameIndex}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IDiagramResponse = await response.json();
                    resolve(result);
                } else if (this.isUsualError(response.status)) {
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