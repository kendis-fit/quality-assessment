import { useState, useEffect } from "react";

import IData from "./Interfaces/IData";

function useDataApi<T>(fetchMethod: () => Promise<T>): IData<T> {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | any>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {

        const getData = async () => {

            try
            {
                setData(await fetchMethod());
                setLoading(false);
            }
            catch
            {
                setError(true);
            }
        }

        if (loading)
        {
            getData();
        }
    });

    return { data, loading, setData, error };
}

export default useDataApi;