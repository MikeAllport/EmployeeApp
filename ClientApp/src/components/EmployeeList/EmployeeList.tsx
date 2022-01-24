import React from 'react';
import { Card } from '../../common/Card/Card';
import { FloatingLabel } from '../../common/FloatingLabel/FloatingLabel';
import { Header } from '../../common/Header/Header';
import { DropDownOption, TitledDropDown } from '../../common/TitledDropDown/TitledDropDown';
import { TitledInput } from '../../common/TitledSearchInput/TitledInput';
import { Employee } from '../../models/Employee';
import { convertStringToSortType, SortType, SortTypes } from '../../models/SortTypes';
import { EmployeeEditModal } from '../EmployeeEditModal/EmployeeEditModal';
import { saveButtonStyle } from '../EmployeeEditModal/EmployeeModalStyles';
import { buttonStyle, flexItem, horizontalFlexContainer, incrementButtonStyle, innerCardStyle, listTopContainer, newButtonContainerStyle, newButtonStyle, trashButtonStyle } from './EmployeeListStyles';

interface Props {
    employees: Employee[];
    selectedSort: string;
    onFilterCallback: (searchString: string) => void;
    onSortCallback: (sortByType: SortType) => void;
    onUpdateEmployeeCallback: (oldEmployee: Employee, newEmployee: Employee) => void;
    onIncrementCallback: () => void;
    onDeleteCallback: (toDelete: Employee) => void;
    onNewEmployeeCallback: (newEmployee: Employee) => void;
}

interface State {
    selectedEmployee: Employee | null
    isCreatingNewEmployee: boolean
}

export default class EmployeeList extends React.Component<Props, State> {

    private title = "Employee List";
    private dropDownoptions: DropDownOption[] = [
        { value: SortTypes.namesAsc },
        { value: SortTypes.namesDesc },
        { value: SortTypes.valueAsc },
        { value: SortTypes.valueDesc }
    ]

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedEmployee: null,
            isCreatingNewEmployee: false
        }
    }

    private setSelectedEmployee = (employee: Employee) => {
        this.setState({ selectedEmployee: employee });
    }

    private onUpdateEmployee = (oldEmployee: Employee, newEmployee: Employee): void => {
        this.setState({ selectedEmployee: null });
        this.props.onUpdateEmployeeCallback(oldEmployee, newEmployee);
    }

    // TODO: Clean this up, EmployeeEditModal needs generalising to be used with both
    // onUpdate and onNewEmployee
    private onNewEmployee = (oldEmployee: Employee, newEmployee: Employee): void => {
        this.setState({ selectedEmployee: null, isCreatingNewEmployee: false });
        this.props.onNewEmployeeCallback(newEmployee);
    }

    BuildEmployees = (): JSX.Element[]  => {
        let employeeElements: JSX.Element[] = [];
        if(this.props.employees && this.props.employees.length > 0) 
            this.props.employees.map((employee) => {
                employeeElements.push(
                    <Card
                        key={employee.name}
                        containerStyle={innerCardStyle} >
                            <div style={horizontalFlexContainer}>
                                <div style={flexItem}>
                                    {employee.name}
                                </div>
                                <div style={{...flexItem, textAlign: 'right', paddingRight: '5px'}}>
                                    Value: {employee.value}
                                </div>
                                <button 
                                    style={buttonStyle}
                                    onClick={() => this.setSelectedEmployee(employee) }
                                >
                                    <i className="far fa-edit" />
                                </button>
                                <button
                                    style={{...buttonStyle, ...trashButtonStyle}}
                                    onClick={() => this.props.onDeleteCallback(employee)}
                                >
                                    <i className="fas fa-trash-alt" />
                                </button>
                            </div>
                    </Card>
            )});
        return employeeElements;
    }

    render () {
        return (
            <>
                <Card>
                    <Header
                        titleText={this.title}
                    />
                    <div style={{...horizontalFlexContainer, margin: '20px'}}>
                        <TitledInput 
                            label='Search' 
                            buttonIconName="fas fa-search"
                            onChangeCallback={this.props.onFilterCallback}
                        />
                        <TitledDropDown 
                            label='Sort by'
                            onChangeCallback={(value: string) => {
                                var sortType = convertStringToSortType(value);
                                this.props.onSortCallback(sortType);
                            }}
                            defaultSelected={this.props.selectedSort}
                            options={this.dropDownoptions}
                        />
                        <FloatingLabel label='Increment fn'>
                            <div style={{width: '120px'}}>
                                <button 
                                    style={{...buttonStyle, ...incrementButtonStyle}}
                                    onClick={() => this.props.onIncrementCallback()}
                                >
                                    Increment
                                </button>
                            </div>
                        </FloatingLabel>
                    </div>
                    <div style={{...listTopContainer}}>
                        {this.BuildEmployees()}
                    </div>
                    <div style={newButtonContainerStyle}>
                        <button 
                            style={{...saveButtonStyle, ...newButtonStyle}}
                            onClick={() => {
                                this.setSelectedEmployee({ name: "", value: 0 });
                                this.setState({ isCreatingNewEmployee: true });
                            }}
                        >
                            New
                        </button>
                    </div>
                </Card>
                {
                    // load edit modal only if employee selected
                    this.state.selectedEmployee !== null? 
                        // currently using EmployeeEditModal for both updating and creating new
                        <EmployeeEditModal 
                            originalEmployee={this.state.selectedEmployee!!} 
                            onUpdateEmployeeCallback={
                                this.state.isCreatingNewEmployee? this.onNewEmployee: this.onUpdateEmployee
                            }
                        />
                    : null
                }
            </>
        );
    }
}
