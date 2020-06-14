import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'

import * as Actions from "../../actions";

import "./style.scss"

import { getUrlName } from "../../services/handles"
import { Link } from 'react-router-dom';

const SideSearch = ({sideSearch,blackMode,items,dispatch,}) => {
    const [searchData, setSearchData] = useState("");
    const [data, setData] = useState();

    useEffect(() => {
        if(searchData===""){
            setData(items);
        }else{ 
            setData(items.filter(item => item.name.includes(searchData.toUpperCase())))
        }
    }, [searchData,items])
    return (
        <div className={ sideSearch === true || sideSearch === "true" ? blackMode ? "side-bar--active-black": "side-bar--active"  : "side-bar"}>
            <header>
                <button onClick={() => dispatch(Actions.handleSideSearch())} className="side-bar--active__return" ><i className="fas fa-arrow-left"></i></button>
                <h2 className="side-bar--active__title">Buscar Produto</h2>
            </header>
            <div className="side-bar--active__search">
                <input type="text" placeholder="Buscar por porduto..." value={searchData} onChange={(e)=>setSearchData(e.target.value)} />
            </div>
            <div className="side-bar--active__contents">
                { data && data.map(item => 
                    <Link to={`/${getUrlName(item.name)}/${item.style}/${item.code_color}`} className={ blackMode ? "link--black" : "link" }>
                        <div className="side-bar--active__content--search" key={item.id} onClick={()=>dispatch(Actions.handleSideSearch())}>
                            <img className="side-bar--active__image"src={item.image ? item.image : "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"} alt={item.name}></img>
                            <div className="side-bar--active__block">
                                <div className="side-bar--active__row">
                                    <h3 className="side-bar--active__name">{item.name}</h3>
                                </div>
                                <div className="side-bar--active__row">
                                    <h2 className="side-bar--active__price">{item.actual_price} <span>{item.installments}</span></h2>
                                </div>
                            </div>
                            
                        </div> 
                    </Link>
                )}
            </div>
        </div>
    )
}

export default connect(state=> ({sideSearch: state.sideSearch, blackMode: state.isBlackMode,items: state.data}))(SideSearch)
