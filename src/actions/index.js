export const changeStyle = () =>{
    return {
        type: "CHANGE_STYLE", 
    }
}

export const setData = (data) => {
    return{
        type: "SET_DATA",
        payload: data
    }
} 
export const setErrorData = () => {
    return{
        type: "SET_ERROR_DATA",
    }
}

export const addItemInBag = (item) =>{
    return {
        type: "ADD_ITEM_IN_BAG",
        payload: item
    }
}

export const handleSideBar = () => {
    return{
        type: "HANDLE_SIDE_BAR",
    }
} 

export const handleSideSearch = () => {
    return{
        type: "HANDLE_SIDE_SEARCH",
    }
} 

export const plusItem = (item) => {
    return{
        type: "PLUS_ITEM",
        payload: item
    }
}

export const lessItem = (item) => {
    return{
        type: "LESS_ITEM",
        payload: item
    }
}

export const removeItem = (item) => {
    return{
        type: "REMOVE_ITEM",
        payload: item
    }
}

