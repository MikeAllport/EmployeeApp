import React, { CSSProperties } from "react";
import { labelStyle, borderContainer, containerStyle } from "./FloatingLabelStyle";

interface Props {
    label?: string,
    borderStyle?: CSSProperties,
    labelStyle? :CSSProperties,
}

export class FloatingLabel extends React.Component<Props> {

    render() {
        return <>
        <div style={{width: 'min-content'}}>           
            <label style={{...labelStyle, ...this.props.labelStyle}}>
                {this.props.label}
            </label>
            <fieldset style={{...borderContainer, ...this.props.borderStyle}}>
                <legend>
                </legend>
                <div style={containerStyle}>
                    {this.props.children}
                </div>
            </fieldset>
        </div>
        </>
    }
}