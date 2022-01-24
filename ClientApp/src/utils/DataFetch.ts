import { EnvironmentSettings } from "../environment/Settings-model";
import { Employee } from "../models/Employee";
import { AddResponse, FetchRequest, RemoveResponse, ResponseError, SummedResponse, UpdateRequest, UpdateResponse } from "../models/RequestResponse"

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

export const IncrementFetch = (): Promise<FetchRequest> => {
    let url = `${EnvironmentSettings.BaseUrl}/List/Increment`;
    return DataFetch<FetchRequest>({ url: url, init: {
        method: "GET"
    }});
} 

const ListDataFetch = <T extends ResponseError>(init: RequestInit): Promise<T>  => {
    let url = `${EnvironmentSettings.BaseUrl}/List`;
    return DataFetch<T>({ url: url, init: init });
}

export const FetchEmployees = () => {
    return ListDataFetch<FetchRequest>({ method: "GET" });
}

export const GetSummedEmployees = (): Promise<SummedResponse> => {
    let url = `${EnvironmentSettings.BaseUrl}/List/Summed`
    return DataFetch<SummedResponse>({
        url: url,
        init: {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }
    })
}

export const UpdateEmployee = (oldEmployee: Employee, newEmployee: Employee) => {
    let requestMessage: UpdateRequest = {
        oldName: oldEmployee.name,
        oldValue: oldEmployee.value,
        newName: newEmployee.name,
        newValue: newEmployee.value
    };
    return ListDataFetch<UpdateResponse>({
        body: JSON.stringify(requestMessage),
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
}

export const DeleteEmployee = (employee: Employee): Promise<RemoveResponse> => {
    return ListDataFetch<RemoveResponse>({
        body: JSON.stringify(employee),
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
}

export const AddNewEmployee = (newEmployee: Employee): Promise<AddResponse> => {
    return ListDataFetch<AddResponse>({
        body: JSON.stringify(newEmployee),
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
}