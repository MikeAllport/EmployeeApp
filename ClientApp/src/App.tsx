import { prependOnceListener } from 'process';
import React, { Component } from 'react';
import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';
import { Employee } from './models/Employee';
import { buttonStyle, flexItem, horizontalFlexContainer, innerCardStyle, listItem, listTopContainer, scrollBar } from './styles/EmployeeListStyles';
import { FetchEmployees } from './utils/DataFetch';

interface Props {

}

interface State {
    titleText: 'Employees' | 'Sum Values > 11170';
    isLoading: boolean;
    employees: Employee[];
}

export default class App extends React.Component<Props, State> {

    private styles = {
        employeeCardBackgroundColour: {

        }
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            titleText: 'Employees',
            isLoading: false,
            employees: []
        }
    }

    componentDidMount() {
        this.setState({ ...this.state, isLoading: true });
        FetchEmployees()
            .then((response) => {
                this.setState({ 
                    ...this.state, 
                    isLoading: false, 
                    employees: response.data 
                })
            })
    }

    BuildEmployees = (): JSX.Element[]  => {
        let employeeElements: JSX.Element[] = [];
        if(this.state.employees && this.state.employees.length > 0) 
            this.state.employees.map((employee) => {
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
                            <button style={buttonStyle}>
                                <i className="far fa-edit"></i>
                            </button>
                        </div>
                </Card>
            )});
        return employeeElements;
    }

    render () {
        return (
            <Card>
                <Header
                    titleText={this.state.titleText}
                />
                <div style={{...listTopContainer, ...scrollBar}}>
                    {this.BuildEmployees()}
                </div>
            </Card>
        );
    }
}
