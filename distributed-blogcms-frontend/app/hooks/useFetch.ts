import { useState, useEffect } from 'react';
import axios, { AxiosHeaders, AxiosRequestConfig, CancelTokenSource } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';

interface UseFetchOptions {
    headers?: Record<string, string> | AxiosHeaders | undefined;
}

interface UseFetchResult<T> {
    data: T | null;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    isRefetching?: boolean;
    refetchData?: () => void;
    resetState?: () => void;
    transformResponse?: (transformFunc: (data: T | null) => T | null) => void;
    setCustomHeaders?: (headers: Record<string, string>) => void;
    setConfig?: (config: AxiosRequestConfig) => void;
    cancelRequest?: () => void;
    setPollingInterval?: (interval: number) => void;
}

const useFetch = <T extends any>(
    apiEndpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    requestData: any = null,
    options: any // UseFetchOptions = {} 
): UseFetchResult<T> => {
    const axiosInstance = useAxiosPrivate();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isRefetching, setIsRefetching] = useState<boolean>(false);

    const fetchData = async (cancelTokenSource?: CancelTokenSource) => {
        if (!data) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
    
        try {
            const axiosConfig: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                cancelToken: cancelTokenSource?.token,
                ...options,
            };
    
            const axiosResponse = await axiosInstance.request<T>({
                method,
                url: apiEndpoint,
                data: requestData,
                ...axiosConfig,
            });
    
            if (axiosResponse && axiosResponse.data) {
                const responseData: any = axiosResponse.data;
                setData(responseData);
                setIsSuccess(true);
            } else {
                setIsError(true);
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.error('Error fetching data:', error);
                setIsError(true);
            }
        } finally {
            // Check if the request was not canceled
            if (!cancelTokenSource?.token.reason) {
                setIsLoading(false);
                setIsRefetching(false);
            }
        }
    };
    
    
    const refetchData = () => {
        setIsSuccess(false);
        setIsLoading(true);
        fetchData();
    };

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
    
        fetchData(cancelTokenSource);
    
        return () => {
            cancelTokenSource.cancel("Request canceled by cleanup");
        };
    }, [apiEndpoint, method, requestData, options.headers]);
    



    const resetState = () => {
        setData(null);
        setIsLoading(false);
        setIsSuccess(false);
        setIsError(false);
        setIsRefetching(false);
    };

    const transformResponse = (transformFunc: (data: T | null) => T | null) => {
        setData(transformFunc(data));
    };

    const setCustomHeaders = (headers: Record<string, string>) => {
        options.headers = { ...options.headers, ...headers };
        fetchData();
    };

    const setConfig = (newConfig: AxiosRequestConfig) => {
        options = { ...options, ...newConfig };
        fetchData();
    };

    const cancelRequest = () => {
        setIsLoading(false);
        setIsRefetching(false);
    };

    const setPollingInterval = (interval: number) => {
        const polling = setInterval(fetchData, interval);

        return () => clearInterval(polling);
    };

    return {
        data,
        isLoading,
        isSuccess,
        isError,
        isRefetching,
        refetchData,
        resetState,
        transformResponse,
        setCustomHeaders,
        setConfig,
        cancelRequest,
        setPollingInterval,
    };
};

export default useFetch;
