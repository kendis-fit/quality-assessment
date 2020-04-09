import { BaseAPI } from "../BaseAPI";
import { IIndex } from "../../Components/Pages/Profile/Interfaces/IIndex";

import { ServerError } from "../Errors/ServerError/ServerError";
import { IDiagramResponse } from "../ProjectAPI/Interfaces/IDiagramResponse";
import { IServerError } from "../Errors/ServerError/Interfaces/IServerError";
import { IProfileResponse } from "../ProjectAPI/Interfaces/IProfileResponse";
import { IResultIndexResponse } from "../ProjectAPI/Interfaces/IResultIndexResponse";
import { ICreatedRequirementResponse } from "./Interfaces/ICreatedRequirementResponse";

export class RequirementAPI extends BaseAPI {
    public constructor() {
        const token = localStorage["token"];
        const url = `${process.env.REACT_APP_API}/requirements`;
        super(token, url);
    }

    public create(name: string): Promise<ICreatedRequirementResponse> {
        return new Promise<ICreatedRequirementResponse>(async (resolve, reject) => {
            try {
                const response = await this.fetch(this.url, {
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