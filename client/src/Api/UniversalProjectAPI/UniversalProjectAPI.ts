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
        const url = `${process.env.REACT_APP_API}/universal-projects`;
        super(token, url);
    }

    public create(project: ICreateProject): Promise<ICreatedProjectResponse> {
        return new Promise<ICreatedProjectResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(this.url, {
                    method: "POST",
                    body: JSON.stringify(project),
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

    public findById(id: number): Promise<IUniversalProjectResponse> {    
        return new Promise<IUniversalProjectResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IUniversalProjectResponse = await response.json();
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

    public update(id: number, profile: IIndex[]): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(profile),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    resolve(true);
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

    public delete(id: number): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    resolve(true);
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