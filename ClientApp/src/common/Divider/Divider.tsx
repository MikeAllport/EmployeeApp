import { CSSProperties } from "@material-ui/core/styles/withStyles"
import React from "react"
import { dividerStyle } from "./DividerStyle"

interface Props {
    style?: CSSProperties
}

export class Divider extends React.Component<Props> {

    public render(): JSX.Element {
        return <div style={{ ...dividerStyle, ...this.props.style }} />
    }
}