import React from "react";
import { Input } from "reactstrap";
import { FloatingLabel } from "../FloatingLabel/FloatingLabel";
import { height, searchButtonStyle } from "./TitledSearchInputStyles";

interface Props {
    label?: string,
}

export class TitledSearchInput extends React.Component<Props> {

    render() {
        return <>
            <FloatingLabel
                label="Search"
            >
                    <div style={{width: 'max-content', display: 'flex', flexFlow: 'row'}}>
                        <Input
                            type="text"
                            title="test"
                            style={height}
                        />
                        <div>
                            <button style={{...searchButtonStyle, height: '26px'}}>
                            <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
            </FloatingLabel>
        </>
    }
}