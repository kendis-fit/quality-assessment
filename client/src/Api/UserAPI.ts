import BaseAPI from "./BaseAPI";

import IUserResponse from "./Interfaces/IUserResponse";
import IRegistration from "../Components/Registration/Interfaces/IRegistration";

export default class UserAPI {
    public Login() {

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