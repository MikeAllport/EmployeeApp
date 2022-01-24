import { CSSProperties } from "react";

export const employeeListItemStyle: CSSProperties = {
    backgroundColor: "#1266a"
}

export const innerCardStyle: CSSProperties = {
    boxShadow: 'rgba(255, 255, 255, 0.19) 0px 10px 20px, rgba(255, 255, 255, 0.23) 0px 6px 6px',
    borderRadius: '3px',
    backgroundColor: 'white',
    margin:'20px',
    padding: '0px 0px 0px 0px !important',
    minWidth: 'min-content',
    maxWidth: 'min-content',
}

export const listTopContainer: CSSProperties = {
    maxWidth: 'min-content',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '20px',
    maxHeight: '500px',
    overflowY: 'auto'
}

export const horizontalFlexContainer: CSSProperties = {
    display: 'flex',
    flexFlow: 'row',
    padding: '0px',
    maxWidth: 'min-content'
}

export const flexItem: CSSProperties = {
    width: '150px',
    padding: '10px'
}

export const buttonStyle: CSSProperties = {
    backgroundColor: 'DodgerBlue', 
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    width: '40px',
    marginLeft: '15px',
    paddingLeft: '7px'
}

export const trashButtonStyle: CSSProperties = {
    backgroundColor: 'rgba(191,63,63)',
    marginLeft: '0px'
}

export const incrementButtonStyle: CSSProperties = {
    width: '90px',
    height: '26px', 
    fontWeight: 'bold'
}


export const newButtonContainerStyle: CSSProperties = {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    placeContent: 'center'
}

export const newButtonStyle: CSSProperties = {
    backgroundColor: 'DodgerBlue', 
}