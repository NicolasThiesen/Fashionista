import React from 'react'

import LogoBlack  from '../../assets/logo-black.png'

import LogoWhite from "../../assets/logo-white.png"

import './style.scss';

import { connect } from "react-redux";

import * as Actions from "../../actions";

import { Link } from "react-router-dom";

import { SideBar,  SideSearch} from '../index'

const Header = ({isBlackMode,amount,dispatch}) => {

    return (
        <>
            <div className={`container ` && isBlackMode ===true ? "header--black": "header"}>
                <Link to="/">
                    <img src={isBlackMode === true ? LogoWhite : LogoBlack} className="header__logo" alt="Fashionista Logo"></img>
                </Link>
                <div className={isBlackMode ===true ? "header--black__options" : "header__options"}>
                    <button>
                        <i className="fas fa-search" onClick={()=>dispatch(Actions.handleSideSearch())} ></i>
                    </button>
                    <button onClick={()=>dispatch(Actions.handleSideBar())}>
                        <i className="fas fa-shopping-bag"></i>
                        <sup className="header__counter">{amount}</sup>
                    </button>
                    <button onClick={() => {dispatch(Actions.changeStyle())}}>
                        <i className={isBlackMode === true ? "fas fa-sun" : "fas fa-moon"}></i>
                    </button>
                </div>
            </div> 
            <SideBar></SideBar>
            <SideSearch></SideSearch>
        </>
    )
};

export default connect(state=> ({isBlackMode: state.isBlackMode, amount: state.bag.amount, sideBar: state.sideBar}))(Header)
