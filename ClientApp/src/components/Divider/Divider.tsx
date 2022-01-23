import React from "react"
import { dividerStyle } from "./DividerStyle"

export class Divider extends React.Component {

    public render(): JSX.Element {
        return <div style={dividerStyle} />
    }
}