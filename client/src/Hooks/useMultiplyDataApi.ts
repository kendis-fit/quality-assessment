import { useState, useEffect } from "react";

import IData from "./Interfaces/IData";
import { ServerError } from "../Api/Errors/ServerError/ServerError";

export function useMultiplyDataApi<T>(fetchMethods: Promise<T>[]): IData<T[]> {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | any>();
    const [error, setError] = useState<ServerError | undefined>();

    useEffect(() => {

        const getData = async () => {

            try
            {
                console.log(loading);
                setData(await Promise.all(fetchMethods));
                setLoading(false);
                console.log("test");
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