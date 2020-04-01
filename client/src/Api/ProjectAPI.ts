import BaseAPI from "./BaseAPI";

export class ProjectAPI extends BaseAPI {
    public constructor(token: string) {
        super(token);
    } 

    public GetProjectById(id: number) {    
        return new Promise(async (resolve, reject) => {
            const response = await this.fetch(`${process.env.REACT_APP_API}/projects/${id}`, {
                method: "GET"
            });
            if (response.ok) {
                const result = await response.json();
                resolve(result);
            } else {
                reject();
            }
        });
    }
}