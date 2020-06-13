import React, {useEffect} from 'react';

import './App.css';

import {api} from '../services/api.js'

import * as Actions from "../actions";

import {Routes} from './routes';  

import { connect } from 'react-redux';


const App = ({isBlackMode,dispatch}) =>{
  useEffect(() => {
    async function getData(){
        const res =  await api.get()
        if(res.status===200){
            dispatch(Actions.setData(res.data))
        }else{
            dispatch(Actions.setErrorData())
        }
        
    }
    getData();
    }, [])
  return(
  
    <div className={isBlackMode===true ? "black-style" : "" }>
      <Routes></Routes>
    </div>
  
  )
  }
export default connect(state=>({isBlackMode: state.isBlackMode}))(App);
