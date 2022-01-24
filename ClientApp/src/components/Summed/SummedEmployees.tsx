import React from "react";
import { Card } from "../../common/Card/Card";
import { Header } from "../../common/Header/Header";
import { Employee } from "../../models/Employee";
import { flexItem, horizontalFlexContainer, innerCardStyle } from "../EmployeeList/EmployeeListStyles";

interface Props {
    summedEmployees: Employee[]
}

export class SummedEmployees extends React.Component<Props> {
    
    BuildEmployees = (): JSX.Element[]  => {
        let employeeElements: JSX.Element[] = [];
        if(this.props.summedEmployees && this.props.summedEmployees.length > 0) 
            this.props.summedEmployees.map((employee) => {
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
                            </div>
                    </Card>
            )});
        return employeeElements;
    }

    render() {
        return <>
            <Card containerStyle={{maxHeight: 'min-content', height: 'min-content'}}>
                <Header titleText="Summed Employees" />
                <div style={{marginLeft: 'auto', marginRight: 'auto', width: 'min-content'}}>
                    {this.BuildEmployees()}
                </div>
            </Card>
        </>
    }
}