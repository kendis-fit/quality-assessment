import { useState, useEffect } from "react";

import IData from "./Interfaces/IData";
import { ServerError } from "../Api/Errors/ServerError/ServerError";

export function useDataApi<T>(fetchMethod: () => Promise<T>): IData<T> {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | any>();
    const [error, setError] = useState<ServerError | undefined>();

    useEffect(() => {

        const getData = async () => {

            try
            {
                setData(await fetchMethod());
                setLoading(false);
            }
            catch (error)
            {
                setError(error);
            }
        }

        if (loading)
        {
            getData();
        }
    });

    return { data, loading, setData, error };
}
