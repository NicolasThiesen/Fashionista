import React from 'react'

import './style.scss';

import { Link } from 'react-router-dom';

import { getUrlName } from "../../services/handles";
import { connect } from 'react-redux';

const Card = ({isBlack,item}) => {

    return (
      
            <div className="card"> 
             <Link to={`/${getUrlName(item.name)}/${item.style}/${item.code_color}`} className={"card " && isBlack ? "link--black" : "link" }>
                    <figure className="card__image">
                        <img src={item.image === "" ? "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível" : item.image} alt={item.name} />
                        { item.actual_price !== item.regular_price && <span className="card__discount-perc">{item.discount_percentage}</span> }
                    </figure>
                    <h2 className="card__title">{item.name}</h2>
                { item.actual_price !== item.regular_price && <h3 className="card__old-price">{item.regular_price}</h3> }
                <h3 className="card__price">{item.actual_price}</h3> 
               </Link> 
            </div>
        
    )
}

export default connect(state=> ({isBlack: state.isBlackMode}))(Card)
