import BaseAPI from "./BaseAPI";
import IIndex from "../Components/Profile/Interfaces/IIndex";

export default class UniversalProjectAPI extends BaseAPI {
    public constructor(token: string) {
        super(token);
    }

    public GetProjectById(id: number): Promise<IIndex[]> {
        return new Promise<IIndex[]>(async (resolve, reject) => {
            const response = await this.fetch(`${process.env.REACT_APP_API}/universal-projects/${id}`);
            if (response.ok) {
                const result: IIndex[] = await response.json();
                resolve(result);
            } else {
                reject();
            }
        });
    }
}