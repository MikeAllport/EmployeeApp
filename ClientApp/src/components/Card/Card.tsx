import React, { CSSProperties } from 'react'
import { cardStyle, shadowStyle } from './CardStyles'
interface Props {
    containerStyle?: CSSProperties;
}

export class Card extends React.Component<Props> {

    public render(): JSX.Element {
        return <div style={{ 
            ...shadowStyle,
            ...cardStyle, 
            ...this.props.containerStyle }}>
            {this.props.children}
        </div>
    }
}