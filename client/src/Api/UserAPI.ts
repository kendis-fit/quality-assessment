import IUserResponse from "./Interfaces/IUserResponse";
import ILogin from "../Components/Login/Interfaces/ILogin";
import IRegistration from "../Components/Registration/Interfaces/IRegistration";

export default class UserAPI {
    public Login(user: ILogin): Promise<IUserResponse> {
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
                reject();
            }
        });
    }

    public Registration(user: IRegistration): Promise<IUserResponse> {
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
                reject();
            }
        });
    }
}