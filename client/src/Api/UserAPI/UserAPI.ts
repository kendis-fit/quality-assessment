import { IUserResponse } from "./Interfaces/IUserResponse";
import { ServerError } from "../Errors/ServerError/ServerError";
import { ILogin } from "../../Components/Pages/Login/Interfaces/ILogin";
import { IServerError } from "../Errors/ServerError/Interfaces/IServerError";
import { IRegistration } from "../../Components/Pages/Registration/Interfaces/IRegistration";

export class UserAPI {
    public login(user: ILogin): Promise<IUserResponse> {
        return new Promise<IUserResponse>(async (resolve, reject) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/users/login`, {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const result: IUserResponse = await response.json();
                    resolve(result);
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

    public registration(user: IRegistration): Promise<IUserResponse> {
        return new Promise<IUserResponse>(async (resolve, reject) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/users/registration`, {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const result: IUserResponse = await response.json();
                    resolve(result);
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