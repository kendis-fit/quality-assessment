export abstract class BaseAPI {
    private readonly token: string;
    protected readonly url: string;

    public constructor(token: string, url: string) {
        this.token = token;
        this.url = url;
    }

    public fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        return fetch(input, {...init,
            headers: {...init?.headers, "Authorization": `Bearer ${this.token}`}
        });
    }
}