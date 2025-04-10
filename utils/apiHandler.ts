// ~/utils/apiHandler.ts
import { $fetch } from 'ofetch'; // Ensure you import $fetch
import { apiEndpoints } from './apiEndpoints';

export const apiHandler = async <T = unknown, R = unknown>(
    endpointKey: string,
    params: T,
    options: RequestInit = {}
): Promise<R> => {
    const endpoint: ApiEndpoint | undefined = apiEndpoints[endpointKey];

    if (!endpoint) {
        throw new Error(`API endpoint '${endpointKey}' not found.`);
    }

    const { url, method } = endpoint;

    const fetchOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        body: JSON.stringify(params),
        ...options,
    };

    try {
        // $fetch automatically handles JSON parsing
        let encryptedResult: any
        if (url === 'https://ipinfo.io/json') {
            encryptedResult = await $fetch<R>(url);
        } else {
            encryptedResult = await $fetch<R>(`${url}/?encrypt=false`, fetchOptions);
        }
        let response: any = {};
        if (typeof encryptedResult == "string") {
            response = decryptedResult(encryptedResult); // Now you have the original result
        } else {
            response = encryptedResult; // Now you have the encrypted result
        }
        return response;
    } catch (error) {
        console.error('API Error:', error);
        throw error; // Rethrow for further handling if necessary
    }
};

export const siteApiHandler = async <T = unknown, R = Array<T>>(
    endpointKey: string,
    params: T,
    options: RequestInit = {}
): Promise<R> => {

    const endpoint: ApiEndpoint | undefined = getUrl(endpointKey);
    if (!endpoint) {
        throw new Error(`API endpoint '${endpointKey}' not found.`);
    }

    const { url, method } = endpoint;
    const fetchOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    };

    try {
        // $fetch automatically handles JSON parsing
        let encryptedResult: any
        encryptedResult = await $fetch<R>(`${url}/${params}/?encrypt=false`, fetchOptions);
        let response: any = {};
        if (typeof encryptedResult == "string") {
            response = decryptedResult(encryptedResult); // Now you have the original result
        } else {
            response = encryptedResult; // Now you have the encrypted result
        }
        return response;
    } catch (error) {
        console.error('API Error:', error);
        throw error; // Rethrow for further handling if necessary
    }
};