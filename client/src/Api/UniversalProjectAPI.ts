import IIndex from "../Components/Profile/Interfaces/IIndex";

export default class UniversalProjectAPI {
    public static GetProjectById(id: number): Promise<IIndex[]> {
        return new Promise<IIndex[]>(async (resolve, reject) => {
            const response = await fetch(`${process.env.REACT_APP_API}/universal-projects/${id}`);
            if (response.ok) {
                const result: IIndex[] = await response.json();
                resolve(result);
            } else {
                reject();
            }
        });
    }
}