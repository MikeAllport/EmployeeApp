import { CSSProperties } from "react";

const backgroundColour =  'rgba(50,118,176)';
const invertedColour: string = 'rgba(19,42,65)';

export const modalUnderlayContainer: CSSProperties = {
    width: '100%',
    minHeight: '100%',
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    top: 0,
    left: 0,
    overflow: 'auto'
}

export const containerStyle: CSSProperties = {
    flexFlow: 'column',
    padding: '50px',
    backgroundColor: backgroundColour,
    maxWidth: 'max-content',
    display: 'inline-grid',
    minWidth: 'min-content',
    margin: '0px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}

export const fieldStyle: CSSProperties = {
    margin: '25px'
}

export const invertedColourStyle: CSSProperties = {
    color: invertedColour
}

export const inputLabelStyle: CSSProperties = {
    backgroundColor: backgroundColour,
    color: invertedColour
}

export const inputLabelBorderStyle: CSSProperties = {
    borderColor: 'rgba(19,42,65)',
}

export const saveButtonContainerStyle: CSSProperties = {
    marginLeft: 'auto',
    marginRight: 'auto',
}

export const saveButtonStyle: CSSProperties = {
    width: '100px',
    height: '50px',
    backgroundColor: invertedColour,
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white'
}