import React from 'react'

import './style.scss';
import { connect } from 'react-redux';

import * as Actions from '../../actions';

import { handleAddItem, changeToDot, handleLessItem, handleRevoveItem } from '../../services/handles';

const SideBar = ({sideBar,blackMode,bag,dispatch}) => {
    const handlePlusClick = (item) =>{
        const newItems = handleAddItem(bag,item.id);
        const total = parseFloat((JSON.parse(localStorage.getItem("bag")).total_price).toFixed(2)) + changeToDot(item.actual_price); 
        dispatch(Actions.plusItem(
        {
            total_price: total, 
            items: newItems
        }));
    }
    const handleLessClick = (item) =>{
        
        const newItems = handleLessItem(bag,item.id);
        const total = parseFloat((JSON.parse(localStorage.getItem("bag")).total_price).toFixed(2)) - changeToDot(item.actual_price); 
        dispatch(Actions.lessItem(
        {
            total_price: total, 
            items: newItems
        }));
    }
    const handleRemoveClick = (item) =>{
        const newItems = handleRevoveItem(bag,item.id);
        const total = parseFloat((JSON.parse(localStorage.getItem("bag")).total_price).toFixed(2)) - changeToDot(item.actual_price)*item.amount; 
        dispatch(Actions.removeItem(
        {
            total_price: total, 
            items: newItems,
            amount: item.amount
        }));
    }
    
    return (
        <div className={ sideBar === true || sideBar === "true" ? blackMode ? "side-bar--active-black": "side-bar--active"  : "side-bar"}>
            <header>
                <button onClick={() => dispatch(Actions.handleSideBar())} className="side-bar--active__return" ><i className="fas fa-arrow-left"></i></button>
                <h2 className="side-bar--active__title">Bolsa ({bag.amount})</h2>
                <h2 className="side-bar--active__total">
                        Total: R${bag.total_price.toFixed(2)}
                </h2>
            </header>
            <div className="side-bar--active__contents">
                {bag.items.map(item => 
                    <div className="side-bar--active__content" key={item.id}>
                        <img className="side-bar--active__image"src={item.image} alt={item.name}></img>
                        <div className="side-bar--active__block">
                            <div className="side-bar--active__row">
                                <h3 className="side-bar--active__name">{item.name}</h3>
                                <button className="side-bar--active__remove" onClick={()=>handleRemoveClick(item)}>Remover Item</button>
                            </div>
                            <p className="side-bar--active__size">Tamanho: {item.size}</p>
                            <div className="side-bar--active__row">
                                <h2 className="side-bar--active__price">{item.actual_price} <span>{item.installments}</span></h2>
                                <div className="side-bar--active__options">
                                    <button className="side-bar--active__option" onClick={()=>handleLessClick(item)}>-</button>
                                    <p className="side-bar--active__amount">{item.amount}</p>
                                    <button className="side-bar--active__option" onClick={()=>handlePlusClick(item)}>+</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>    
                )}
            </div>
        </div>
    )
}

export default connect(state=>({blackMode: state.isBlackMode,sideBar: state.sideBar, bag: state.bag}))(SideBar)
