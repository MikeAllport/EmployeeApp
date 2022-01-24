import React from 'react'
import { FloatingLabel } from '../FloatingLabel/FloatingLabel'

export interface DropDownOption {
    value: string;
}

interface Props {
    label?: string
    defaultSelected: string
    options: DropDownOption[]
    onChangeCallback: (value: string) => void;
}

export class TitledDropDown extends React.Component<Props> {

    private buildMenuItems = (): JSX.Element[] => {
        let elements: JSX.Element[] = [];
        this.props.options.map((option) => {
            elements.push(
                <option value={option.value} key={option.value}>
                    {option.value}
                </option>
            )
        })
        return elements;
    }

    render() {
        return <>
            <FloatingLabel label={this.props.label}>
                <select style={{height: '26px'}}
                    onChange={(event) => {
                        let value = event.currentTarget.value;
                        this.props.onChangeCallback(value);
                    }}
                >
                    {this.buildMenuItems()}
                </select>
            </FloatingLabel>

        </>
    }
}

