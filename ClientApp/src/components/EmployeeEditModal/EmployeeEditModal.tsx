import React from "react";
import { Card } from "../../common/Card/Card";
import { Header } from "../../common/Header/Header";
import { TitledInput } from "../../common/TitledSearchInput/TitledInput";
import { Employee } from "../../models/Employee";
import { containerStyle, fieldStyle, inputLabelStyle,  invertedColourStyle,  modalUnderlayContainer, saveButtonContainerStyle, saveButtonStyle } from "./EmployeeModalStyles";

interface Props {
    originalEmployee: Employee
    onUpdateEmployeeCallback: (oldEmployee: Employee, newEmployee: Employee) => void;
}

interface State {
    name: string;
    value: number;
}
export class EmployeeEditModal extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            name: props.originalEmployee.name,
            value: props.originalEmployee.value
        };
    }

    private onNameChangeCallback = (value: string) => {
        this.setState({
            name: value
        });
    }

    private onValueChangeCallback = (value: string) => {
        this.setState({
            value: parseInt(value)
        })
    }

    private onSave = () => {
        let oldEmployee = this.props.originalEmployee;
        let newEmployee: Employee = { 
            name: this.state.name,
            value: this.state.value
        }
        this.props.onUpdateEmployeeCallback(oldEmployee, newEmployee);
    }

    render() {
        return <>
            <div style={modalUnderlayContainer} className="modalTest">
                <div style={{width: '100%', height: '100%'}}>
                <Card
                    containerStyle={containerStyle}
                >
                    <Header 
                        titleText="Update Employee" 
                        headerStyle={invertedColourStyle}
                    />
                    <div style={fieldStyle}>
                        <TitledInput
                            labelStyle={inputLabelStyle}
                            inputType="text"
                            label="Name"
                            onChangeCallback={this.onNameChangeCallback}
                            value={this.state.name}
                        />
                    </div>
                    <div style={fieldStyle}>
                        <TitledInput
                            labelStyle={inputLabelStyle}
                            inputType="number"
                            label="Value"
                            onChangeCallback={this.onValueChangeCallback}
                            value={this.state.value.toString()}
                        />
                    </div>
                    <div style={{...fieldStyle, ...saveButtonContainerStyle}}>
                        <button 
                            style={saveButtonStyle}
                            onClick={() => this.onSave()}    
                        >
                            Save
                        </button>
                    </div>
                </Card>
                </div>
            </div>
        </>
    }
}