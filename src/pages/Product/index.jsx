import React, {useEffect,useState} from 'react'

import { useParams } from "react-router-dom";

import { getRegularName,changeToDot, handleAddItem } from "../../services/handles"
import { connect } from 'react-redux';

import * as Actions from '../../actions';

import "./style.scss";

const ProductPage = ({data,bag,dispatch}) => {
    const { product, code_color, style } = useParams();
    const [item,setItem] = useState();
    const [error,setError] = useState(false);
    const [sizeSelected, setSize] = useState(null);
    const [sizes,setSizes] = useState();
    useEffect(()=>{
        setItem(data.find(item => getRegularName(product) === item.name && code_color === item.code_color && item.style === style));
        if(item){
            const getSizes = item.sizes.filter(size => size.available ===true);
            setSizes(getSizes)
        }
        if(data.length === 0){
            setTimeout(()=>document.location.reload(true),1500);
        }
    },[item])
    const handleClick = () =>{
        if(sizeSelected!==null){
            setError(false);
            const total = parseFloat((JSON.parse(localStorage.getItem("bag")).total_price).toFixed(2)) + changeToDot(item.actual_price); 
            const id = item.style + item.code_color + sizeSelected;
            if(bag.items.find(i => i.id === id)){
                const newItems = handleAddItem(bag,id);
                dispatch(Actions.plusItem(
                    {
                        total_price: total, 
                        items: newItems
                    }
                ))
            }else{
                dispatch(Actions.addItemInBag(
                {
                    total_price: total, 
                    item: {size: sizeSelected, name: item.name, actual_price: item.actual_price, installments: item.installments, image: item.image, amount: 1, id: id}
                }));
            }
            
        }else{
            setError(true);
        }
    }
    return (
        <div className="container content">
            
            {
                item && (
                    <>
                        <figure className="content__image">
                            <img src={item.image === "" ? "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível" : item.image} alt={item.name} />
                                { item.actual_price !== item.regular_price && <span className="card__discount-perc">{item.discount_percentage}</span> }
                        </figure>
                        <div className="content__block">
                            <h2 className="content__title">{item.name}</h2>
                            <div className="content__price-contents">
                                {
                                    item.actual_price !== item.regular_price && <h3 className="content__old-price">{item.regular_price}</h3> 
                                }
                                <h3>{item.actual_price}</h3>
                                <h3 className="content__installments">em até {item.installments}</h3>
                            </div>
                            <h4>Escolha o Tamanho</h4>
                            <div className ="content__sizes">
                                {
                                    sizes && sizes.map(size=>
                                        <div className={ size.size !== sizeSelected ? "content__size" : "content__size--selected"} key={size.sku} onClick={()=>setSize(size.size)}>
                                            {size.size}
                                        </div>
                                )
                                }
                            </div>
                            <button className="content__button" onClick={()=>handleClick()}>Adicionar à Bolsa</button>
                            <div className={error ? "content__error" : ""}>
                                {error && <span className="content__error-mensage">Por Favor escolha um tamanho <i className="fas fa-exclamation-triangle"></i></span>}
                            </div>
                        </div>
                    </>
                    )
            }

            
        </div>
    )
}

export default connect(state=>({data: state.data, bag: state.bag}))(ProductPage)
