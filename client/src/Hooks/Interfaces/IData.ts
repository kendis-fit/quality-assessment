import { Dispatch, SetStateAction } from "react";
import { ServerError } from "../../Api/Errors/ServerError/ServerError";

export default interface IData<T> {
    data: T;
    setData: Dispatch<SetStateAction<T>>;
    error: ServerError | undefined;
    loading: boolean;
}