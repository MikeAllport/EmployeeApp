import React, { CSSProperties } from "react"
import { Divider } from "../Divider/Divider"
import { titleStyle } from "./HeaderStyle"

interface Props {
    titleText: string;
    headerStyle?: CSSProperties;
}

export class Header extends React.Component<Props> {

    public render(): JSX.Element {
        return <>
            <h2 style={{...titleStyle ,...this.props.headerStyle}}>
                {this.props.titleText}
            </h2>
            <Divider />
        </>
    }
}