export class ProjectAPI {
    public static GetProjectById(id: number) {    
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${process.env.REACT_APP_API}/projects/${id}`);
            if (response.ok) {
                const result = await response.json();
                resolve(result);
            } else {
                reject();
            }
        });
    }
}