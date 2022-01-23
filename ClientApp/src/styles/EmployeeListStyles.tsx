import { CSSProperties } from "react";

export const employeeListItemStyle: CSSProperties = {
    backgroundColor: "#1266a"
}

export const innerCardStyle: CSSProperties = {
    boxShadow: 'rgba(255, 255, 255, 0.19) 0px 10px 20px, rgba(255, 255, 255, 0.23) 0px 6px 6px',
    borderRadius: '3px',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    minWidth: 'min-content'
}

export const listTopContainer: CSSProperties = {
    maxWidth: '400px',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxHeight: '600px',
    overflowY: 'auto'
}

export const horizontalFlexContainer: CSSProperties = {
    display: 'flex',
    flexFlow: 'row'
}

export const flexItem: CSSProperties = {
    width: '150px'
}

export const buttonStyle: CSSProperties = {
    backgroundColor: 'DodgerBlue', 
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    width: '30px', 
    marginLeft: '15px',
    paddingLeft: '7px'
}

export const scrollBar = {
    "::-webkit-scrollbar": {
        width: "9px"
    },
    "::-webkit-scrollbar-track": {
        background: "red"
    },
    "::-webkit-scrollbar-thumb": {
        background: "#888"
    },
    "::-webkit-scrollbar-thumb:hover": {
        background: "#555"
    }
}