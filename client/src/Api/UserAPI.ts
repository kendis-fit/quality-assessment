import ServerError from "./Interfaces/ServerError";
import IUserResponse from "./Interfaces/IUserResponse";
import ILogin from "../Components/Login/Interfaces/ILogin";
import IRegistration from "../Components/Registration/Interfaces/IRegistration";
import IServerError from "./Interfaces/IServerError";

export default class UserAPI {
    public login(user: ILogin): Promise<IUserResponse> {
        return new Promise<IUserResponse>(async (resolve, reject) => {
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
                const error: ServerError = new ServerError("Server error", result);
                reject(error);
            }
        });
    }

    public registration(user: IRegistration): Promise<IUserResponse> {
        return new Promise<IUserResponse>(async (resolve, reject) => {
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
                const error: ServerError = new ServerError("Server error", result);
                reject(error);
            }
        });
    }
}