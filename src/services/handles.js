export const getUrlName = (name) =>{
    const splited = name.toLowerCase().split(" ");
    const urlName = splited.reduce((acumulator,value) => acumulator + "-" + value);
    return urlName
}

export const handleClick = (item) =>{
    window.location.assign(`/${getUrlName(item.name)}/${item.style}/${item.code_color}`)
}

export const getRegularName = (name) => {
    const splited = name.toUpperCase().split("-");
    return splited.reduce((acumulator,value) => acumulator + " " + value);
}

export const changeToDot = (value) =>{
    const number = parseFloat(value.substring(3).replace(",","."));
    return number;
}

export const changeToComma = (value)=>{
    const price = "R$ " + parseFloat(value).toFixed(2).replace(".",",");
    return price;
}

export const handleAddItem = (bag,id)=>{
    let current_bag = [];
    bag.items.map(i =>{
        if(i.id !== id){
            current_bag.push(i);
        }else{
            current_bag.push({...i, amount: i.amount+1})
        }
    })
    return current_bag;
}
export const handleLessItem = (bag,id)=>{
    let current_bag = [];
    bag.items.map(i =>{
        if(i.id !== id){
            current_bag.push(i);
        }else if(i.amount>1){            
            current_bag.push({...i, amount: i.amount-1})            
        }
    })
    return current_bag;
}
export const handleRevoveItem = (bag,id) =>{
    let current_bag = [];
    bag.items.map(i =>{
        if(i.id !== id){
            current_bag.push(i);
        }
    })
    return current_bag;
}