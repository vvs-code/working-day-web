import Cookies from 'universal-cookie';
import {CONFIG} from '../config';

type IQueryOptions<Request, FetchResponse, PromiseResponse> = {
    url: string;
    method?: string;
    domain?: string;
    data?: Request;
    dataCallback?: (data: FetchResponse) => PromiseResponse;
    onError?: () => unknown;
    client?: boolean;
    debugSilent?: boolean;
};

export default class BaseAPI {
    public static GetLogin(): string {
        const cookies = new Cookies();
        return cookies.get('login');
    }

    public static GetOptions<Request>(options: {
        data?: Request;
        method?: string;
    }): object {
        const cookies = new Cookies();
        return {
            method: options.method ?? 'POST',
            body: JSON.stringify(options.data),
            // credentials: 'include',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${cookies.get('auth_token')}`,
            },
        };
    }

    public static ErrorHandler<Request, IFetchResponse, IPromiseResponse>(
        options: IQueryOptions<Request, IFetchResponse, IPromiseResponse>,
        error: unknown,
    ): void {
        console.error(`Error in ${options.url} (in promise)`, error);
        typeof options.onError === 'function' && options.onError();
    }

    public static PreparedQuery<Request, FetchResponse, PromiseResponse>(
        options: IQueryOptions<Request, FetchResponse, PromiseResponse>,
    ): Promise<PromiseResponse> {
        return new Promise((resolve, reject) => {
            fetch((options.domain ?? CONFIG.backendDomain) + options.url, BaseAPI.GetOptions(options))
                .then((res) => res.json())
                .then(
                    (response: FetchResponse) => {
                        resolve(options.dataCallback!(response));
                    },
                    (error) => {
                        BaseAPI.ErrorHandler(options, error);
                        reject(error);
                    },
                );
        });
    }

    public static Query<Request, Response>(options: IQueryOptions<Request, Response, Response>): Promise<Response> {
        options.dataCallback = (data) => data;
        return BaseAPI.PreparedQuery<Request, Response, Response>(options);
    }

    public static Mutation<Request>(options: IQueryOptions<Request, never, void>): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch((options.domain ?? CONFIG.backendDomain) + options.url, BaseAPI.GetOptions(options)).then(
                () => resolve(),
                (error) => {
                    BaseAPI.ErrorHandler(options, error);
                    reject(error);
                },
            );
        });
    }
}
