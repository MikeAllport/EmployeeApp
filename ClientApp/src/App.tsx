import React from 'react';
import { EmployeeEditModal } from './components/EmployeeEditModal/EmployeeEditModal';
import EmployeeList from './components/EmployeeList/EmployeeList';
import { SummedEmployees } from './components/Summed/SummedEmployees';
import { Employee } from './models/Employee';
import { FetchRequest, SummedResponse } from './models/RequestResponse';
import { SortType } from './models/SortTypes';
import { AddNewEmployee, DeleteEmployee, FetchEmployees, GetSummedEmployees, IncrementFetch, UpdateEmployee } from './utils/DataFetch';

interface Props {
}

interface State {
    employees: Employee[]
    summedEmployees: Employee[]
    filteredEmployees: Employee[]
    sortByType: SortType
    searchString: string
}

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            summedEmployees: [],
            employees: [],
            filteredEmployees: [],
            sortByType: { type: 'Names Asc'},
            searchString: ""
        }
    }

    //#region Callbacks

    // filters all employees for employees that contain search string and updates state
    // filtered employees which employee list uses
    private onFilterCallback = (searchString: string): void => {
        this.setState({ 
            searchString: searchString,
        }, this.refreshEmployees);
    }

    private onSortCallback = ({ type }: SortType): void => {
        this.setState({ 
            sortByType: { type: type } 
        }, this.refreshEmployees);
    }

    private onIncrementCallback = (): void => {
        IncrementFetch()
            .then(FetchEmployees)
            .then((response: FetchRequest) => {
                this.setState({ employees: response.data }, this.refreshEmployees);
            })
            .then(() => this.onGetSummed());
    }

    private onUpdateEmployeeCallback = (oldEmployee: Employee, newEmployee: Employee): void => {
        UpdateEmployee(oldEmployee, newEmployee)
            .then(FetchEmployees)
            .then((response) => {
                this.setState({ employees: response.data }, this.refreshEmployees);
            })
            .then(() => this.onGetSummed());
    }

    private onDeleteCallback = (toDelete: Employee) => {
        DeleteEmployee(toDelete)
            .then(FetchEmployees)
            .then((response) => {
                this.setState({ employees: response.data }, this.refreshEmployees);
            })
            .then(() => this.onGetSummed());
    }

    private onNewEmployeeCallback = (newEmployee: Employee) => {
        AddNewEmployee(newEmployee)
            .then(FetchEmployees)
            .then((response) => {
                this.setState({ employees: response.data }, this.refreshEmployees);
            })
            .then(() => this.onGetSummed());
    }

    private onGetSummed = () => {
        GetSummedEmployees()
            .then((response: SummedResponse) => {
                this.setState({
                    summedEmployees: response.data
                })
            })
    }

    //#endregion

    //#region Class logic

    private sortEmployees(employees: Employee[]): Employee[] {
        let type = this.state.sortByType.type;
        return employees.sort((first, second) => {
            switch(type)
            {
                case 'Names Asc':
                    return first.name > second.name? 1: -1;
                case 'Names Desc':
                    return first.name < second.name? 1: -1;
                case 'Value Asc':
                    return first.value > second.value? 1: -1;
                default: // value desc
                    return first.value < second.value? 1: -1;
            }
        })
    }

    private filterEmployees(employees: Employee[], inputString: string | null = null): Employee[] {
        let searchString = inputString != null? inputString: this.state.searchString;
        if(searchString != "") {
            return employees.filter((employee) => {
                    return employee.name.toLowerCase().includes(searchString.toLowerCase()) ||
                    employee.value.toString().includes(searchString);
                })
        }
        return this.state.employees;
    }

    private refreshEmployees = () => {
        let filteredEmployees = this.filterEmployees(this.state.employees, this.state.searchString);
        let sortedAndFilteredEmployees = this.sortEmployees(filteredEmployees);
        this.setState({ filteredEmployees: sortedAndFilteredEmployees });        
    }

    //#endregion

    //#region Overrides/Render

    componentDidMount() {
        this.setState({ ...this.state});
        FetchEmployees()
            .then((response) => {
                this.setState({ employees: response.data })
                this.refreshEmployees();
            })
            .then(() => this.onGetSummed());
    }

    render () {
        return ( 
            <>
                <div style={{display: 'flex', flexFlow: 'row'}}>
                    <EmployeeList 
                        selectedSort={this.state.sortByType.type}
                        employees={this.state.filteredEmployees}
                        onFilterCallback={this.onFilterCallback}
                        onSortCallback={this.onSortCallback}
                        onUpdateEmployeeCallback={this.onUpdateEmployeeCallback}
                        onIncrementCallback={this.onIncrementCallback}
                        onDeleteCallback={this.onDeleteCallback}
                        onNewEmployeeCallback={this.onNewEmployeeCallback}
                    />
                    <SummedEmployees summedEmployees={this.state.summedEmployees}/>
                </div>
            </>
        );
    }

    //#endregion
}
