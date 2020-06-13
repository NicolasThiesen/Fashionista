import { createStore } from 'redux';

const setInitItem = (item,value) => {
    localStorage.setItem(item,value);
}

const startItem = (item,default_value) =>{
    const data = localStorage.getItem(item);
    if (data !== null){
        if (item === "data"){
            return JSON.parse(data);
        }if(item==="bag"){
            return JSON.parse(data);
        }if(item==="sideBar"){
            return data;
        }if(item==="sideSearch"){
            return data;
        }else{
            return data === "true";
        }
        
    }else{
        if (item === "data"){
            setInitItem(item,default_value)
            return default_value;
        }if(item==="bag"){
            setInitItem(item,JSON.stringify(default_value));
            return default_value;
        }if(item==="sideBar"){
            setInitItem(item,default_value);
            return default_value;
        }
        if(item==="sideSearch"){
            setInitItem(item,default_value);
            return default_value;
        }
        else{
            setInitItem(item,default_value);
            return default_value;
        }
        
    }
    
}


const INITIAL_STATE = {
    isBlackMode: startItem("blackMode","false"),
    sideBar: startItem("sideBar",false),
    sideSearch: startItem("sideSearch",false),
    bag: startItem("bag",{
        amount: 0,
        total_price: 0,
        items: []
    }),
    data: startItem("data",[]), 
}

function reducer(state=INITIAL_STATE,action){
    const {payload} = action;
    switch (action.type) {
        case "CHANGE_STYLE":
            setInitItem("blackMode",`${!state.isBlackMode}`);
            return {...state, isBlackMode: !state.isBlackMode};
        case "SET_DATA":
            setInitItem("data",JSON.stringify(payload));
            return {...state, data: payload}
        case "ADD_ITEM_IN_BAG":
            const bag = { amount: state.bag.amount+1, total_price: payload.total_price, items: [...state.bag.items, payload.item]}
            setInitItem("bag",JSON.stringify(bag));
            return {...state, bag: bag}
        case "HANDLE_SIDE_BAR":
            setInitItem("sideBar", !state.sideBar);
            return {...state, sideBar: !state.sideBar}
        case "HANDLE_SIDE_SEARCH":
            setInitItem("sideSearch", !state.sideSearch);
            return {...state, sideSearch: !state.sideSearch}
        case "PLUS_ITEM":
            const newItemsPlus = { amount: state.bag.amount+1, total_price: payload.total_price, items: payload.items}
            setInitItem("bag",JSON.stringify(newItemsPlus));
            return {...state, bag: newItemsPlus}
        case "LESS_ITEM":
            const newItemsLess = { amount: state.bag.amount-1, total_price: payload.total_price, items: payload.items}
            setInitItem("bag",JSON.stringify(newItemsLess));
            return {...state, bag: newItemsLess}
        case "REMOVE_ITEM":
            const newItemsRemoved = { amount: state.bag.amount-payload.amount, total_price: payload.total_price, items: payload.items}
            setInitItem("bag",JSON.stringify(newItemsRemoved));
            return {...state, bag: newItemsRemoved}
        default:
            return state;
    }
}


const store = createStore(reducer);

export default store;