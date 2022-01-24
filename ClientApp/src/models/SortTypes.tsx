export interface SortType {
    type: 'Names Asc' | 'Names Desc' | 'Value Asc' | 'Value Desc'
}

export const SortTypes = {
    namesAsc: 'Names Asc',
    namesDesc: 'Names Desc',
    valueAsc: 'Value Asc',
    valueDesc: 'Value Desc'
}

// converts string to SortType, returns names asc if string doesnt match
export const convertStringToSortType = (input: string): SortType => {
    switch(input)
    {
        case SortTypes.namesAsc:
            return { type: 'Names Asc' }
        case SortTypes.namesDesc:
            return { type: 'Names Desc' }
        case SortTypes.valueAsc:
            return { type: 'Value Asc' }
        case SortTypes.valueDesc:
            return { type: 'Value Desc' }
        default:
            return { type: 'Names Asc' }
    }
}