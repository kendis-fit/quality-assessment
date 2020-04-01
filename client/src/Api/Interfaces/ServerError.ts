import IServerError from "./IServerError";

export default class ServerError extends Error {
    constructor(message: string, private error: IServerError) {
        super(message);

        Object.setPrototypeOf(this, ServerError.prototype);
    }

    public get reason() {
        return this.error.reason;
    }
}