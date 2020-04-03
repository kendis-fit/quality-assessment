import { BaseAPI } from "../BaseAPI";
import { IIndex } from "../../Components/Pages/Profile/Interfaces/IIndex";

import { ServerError } from "../Errors/ServerError/ServerError";
import { IDiagramResponse } from "../ProjectAPI/Interfaces/IDiagramResponse";
import { IServerError } from "../Errors/ServerError/Interfaces/IServerError";
import { IResultIndexResponse } from "../ProjectAPI/Interfaces/IResultIndexResponse";
import { ICreatedProjectResponse } from "../ProjectAPI/Interfaces/ICreatedProjectResponse";
import { IUniversalProjectResponse } from "../UniversalProjectAPI/Interfaces/IUniversalProjectResponse";

export class RequirementAPI extends BaseAPI {
    public constructor(token: string) {
        const url = `${process.env.REACT_APP_API}/requirements`;
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
                const response = await this.fetch(`${this.url}/${id}`, {
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
                const response = await this.fetch(`${this.url}/${id}/indexes/${nameIndex}`, {
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
                const response = await this.fetch(`${this.url}/${id}/diagrams/${nameIndex}`, {
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
                const response = await this.fetch(`${this.url}/${id}`, {
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
                const response = await this.fetch(`${this.url}/${id}`, {
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