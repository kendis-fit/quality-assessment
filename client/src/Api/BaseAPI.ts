export default abstract class BaseAPI {
    private token: string;
    
    public constructor(token: string) {
        this.token = token;
    }

    public fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        return fetch(input, {...init,
            headers: {...init?.headers, "Authorization": `Bearer ${this.token}`}
        });
    }
}