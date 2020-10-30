import { BaseAPI } from "../BaseAPI";
import { ServerError } from "../Errors/ServerError";
import { ICheckProject } from "./Interfaces/ICheckProject";
import { IProjectResponse } from "./Interfaces/IProjectResponse";
import { IDiagramResponse } from "./Interfaces/IDiagramResponse";
import { IProfileResponse } from "./Interfaces/IProfileResponse";
import { IProjectListResponse } from "./Interfaces/IProjectListResponse";
import { IResultIndexResponse } from "./Interfaces/IResultIndexResponse";
import { IIndex } from "../../Components/Pages/Profile/Interfaces/IIndex";
import { IServerError } from "../Errors/ServerError/Interfaces/IServerError";
import { ICreatedRequirementResponse } from "./Interfaces/ICreatedRequirementResponse";

export class ProjectAPI extends BaseAPI {
    public constructor() {
        const token = localStorage["token"];
        const url = `${process.env.REACT_APP_API}/projects`;
        super(token, url);
    }

    public create(name: string, typeProfile: string): Promise<IProjectListResponse> {
        return new Promise<IProjectListResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(this.url, {
                    method: "POST",
                    body: JSON.stringify({ name, typeProfile }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const result: IProjectListResponse = await response.json();
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

    public createRequirement(id: string, name: string): Promise<ICreatedRequirementResponse> {
        return new Promise<ICreatedRequirementResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}/requirements`, {
                    method: "POST",
                    body: JSON.stringify({ name }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const result: ICreatedRequirementResponse = await response.json();
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

    public checkProject(id: string): Promise<ICheckProject> {    
        return new Promise<ICheckProject>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}/is-multiple`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: ICheckProject = await response.json();
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

    public findRequirementsById(id: string): Promise<IProjectResponse> {    
        return new Promise<IProjectResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}/requirements`, {
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

    public update(id: string, profile: IIndex[]): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(profile),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    resolve();
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

    public deleteById(id: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    resolve();
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

    public findById(id: string): Promise<IProfileResponse> {    
        return new Promise<IProfileResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IProfileResponse = await response.json();
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

    public getDiagram(id: string, nameIndex: string): Promise<IDiagramResponse[]> {
        return new Promise<IDiagramResponse[]>(async (resolve, reject) => {
            try {
                const response = await this.fetch(`${this.url}/${id}/diagrams/${nameIndex}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const result: IDiagramResponse[] = await response.json();
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