import { EnvironmentSettings } from "../environment/Settings-model";
import { Employee } from "../models/Employee";
import { FetchRequest, ResponseError, UpdateRequest } from "../models/RequestResponse"

interface DataArgs {
    url: string;
    init?: RequestInit;
}

// main method to send http request
const DataFetch = <T extends ResponseError>(args: DataArgs): Promise<T> => {
    return fetch(args.url, args.init)
        .then((response) => response.json())
        .then((responseJson) => responseJson as T)
        .then((response: T) => {
            if(response.isError) {
                return Promise.reject(response);
            }
            return response;
        });
}

const ListDataFetch = <T extends ResponseError>(init: RequestInit): Promise<T>  => {
    let url = `${EnvironmentSettings.BaseUrl}/List`;
    return DataFetch<T>({ url: url, init: init });
}

export const FetchEmployees = () => {
    return ListDataFetch<FetchRequest>({ method: "GET" });
}

export const UpdateEmployee = (employee: Employee) => {
    return ListDataFetch<UpdateRequest>({
        body: JSON.stringify(employee),
        method: "PATCH"
    });
}