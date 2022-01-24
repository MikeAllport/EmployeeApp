import React, { CSSProperties } from "react";
import { Input } from "reactstrap";
import { InputType } from "reactstrap/es/Input";
import { FloatingLabel } from "../FloatingLabel/FloatingLabel";
import { inputStyle, searchButtonStyle } from "./TitledInputStyle";

interface Props {
    inputType?: InputType
    label?: string
    labelStyle?: CSSProperties
    labelBorderStyle?: CSSProperties
    onChangeCallback?: (value: string) => void
    buttonIconName?: string
    value?: string
}

interface State {
    value: string
}

export class TitledInput extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            value: this.props.value? this.props.value: ""
        }
    }

    private onChangeCallback = (value: string) => {
        this.setState({
            value: value
        })
    }

    render() {
        return <>
            <FloatingLabel
                label={this.props.label}
                labelStyle={this.props.labelStyle}
                borderStyle={this.props.labelBorderStyle}
            >
                    <div style={{width: 'max-content', display: 'flex', flexFlow: 'row'}}>
                        <Input
                            type={this.props.inputType? this.props.inputType: "text"}
                            title="test"
                            style={inputStyle}
                            onChange={(event) => {
                                let value = event.currentTarget.value;
                                this.onChangeCallback(value);
                                this.props.onChangeCallback?.(value);
                            }}
                            value={this.props.value}
                        />
                        {this.props.buttonIconName?
                            <div>
                                <button style={{...searchButtonStyle, height: '26px'}}>
                                <i className={this.props.buttonIconName}></i>
                                </button>
                            </div>
                        : null }
                    </div>
            </FloatingLabel>
        </>
    }
}