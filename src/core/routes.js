import { Route, Switch, Router } from 'react-router-dom';

import React from 'react'

import history from "../services/history"

import { Initial, ProductPage } from '../pages';

import { Header } from "../components"


export const Routes = () => {
    return (
        <Router history={history}>
            <Header></Header>
            <Switch>
                <Route path="/" exact  component={Initial}></Route>
                <Route path="/:product/:style/:code_color" component={ProductPage}></Route>
            </Switch>
        </Router>

        
    )
}
