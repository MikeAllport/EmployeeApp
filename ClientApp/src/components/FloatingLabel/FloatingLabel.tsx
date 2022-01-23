import React from "react";
import { Input } from "reactstrap";
import { Divider } from "../Divider/Divider";
import { labelStyle, borderContainer, containerStyle } from "./FloatingLabelStyle";

interface Props {
    label?: string,
}

export class FloatingLabel extends React.Component<Props> {

    render() {
        return <>
        <div style={{width: 'min-content'}}>
            
        <label style={labelStyle}>Search</label>
            <fieldset style={borderContainer}>
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