import { useState, useEffect } from "react";

import IData from "./Interfaces/IData";
import { ServerError } from "../Api/Errors/ServerError/ServerError";

export function useDataApi<T>(fetchMethod: () => Promise<T>): IData<T> {

    const [callOnlyOneTime, setCallOnlyOneTime] = useState(true);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | any>();
    const [error, setError] = useState<ServerError | undefined>();

    useEffect(() => {

        const getData = async () => {

            try {
                setData(await fetchMethod());
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        if (callOnlyOneTime)
        {
            setCallOnlyOneTime(false);
            getData();
        }
    }, [callOnlyOneTime, fetchMethod]);

    return { data, loading, setData, error };
}
