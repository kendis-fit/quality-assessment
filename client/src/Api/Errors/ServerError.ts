import IServerError from "../Interfaces/IServerError";

export default class ServerError extends Error {
    constructor(message: string, private error: IServerError) {
        super(message);

        Object.setPrototypeOf(this, ServerError.prototype);
    }

    public static createInternalError(): ServerError {
        this.destroyToken();
        const error: ServerError = new ServerError("", {
            redirectToLogin: true,
            reason: "Service doesn't work. Try to repeate later"
        });
        return error;
    }

    public static createForbiddenError(): ServerError {
        this.destroyToken();
        const error: ServerError = new ServerError("", {
            redirectToLogin: true,
            reason: "Acces is forbidden"
        });
        return error;
    }

    public static createError(status: number): ServerError | null {
        switch (status) {
            case 403:
                return this.createForbiddenError();
            case 500:
                return this.createInternalError();
            default:
                return null;
        }
    }

    public get reason() {
        return this.error.reason;
    }

    public get redirectToLogin() {
        return this.error.redirectToLogin;
    }

    private static destroyToken() {
        delete sessionStorage["token"];
    }
}