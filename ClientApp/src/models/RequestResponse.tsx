import { Employee } from "./Employee";

export interface ResponseError {
    isError: boolean;
    errorMessage: string;
}

export interface FetchRequest extends ResponseError {
    data: Employee[];
}

export interface AddRequest extends ResponseError {
    data: Employee;
}

export interface UpdateRequest extends ResponseError {
    data: Employee;
}

export interface RemoveRequest extends ResponseError {

}