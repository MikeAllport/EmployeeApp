import { Employee } from "./Employee";

export interface ResponseError {
    isError: boolean;
    errorMessage: string;
}

export interface FetchRequest extends ResponseError {
    data: Employee[];
}

export interface AddResponse extends ResponseError {
    data: Employee;
}

export interface UpdateResponse extends ResponseError {
    data: Employee;
}

export interface RemoveResponse extends ResponseError {

}

export interface SummedResponse extends ResponseError {
    data: Employee[]
}

export interface UpdateRequest {
    oldName: string,
    oldValue: number,
    newName: string,
    newValue: number
}