import { Dispatch, SetStateAction } from "react";

export default interface IData<T> {
    data: T;
    setData: Dispatch<SetStateAction<T>>;
    error: boolean;
    loading: boolean;
}