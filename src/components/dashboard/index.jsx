import React from 'react'

import { Card } from "../index"

import "./style.scss"

const Dashboard = ({data}) => {

    return (
        <div className="container dashboard">
            {data.map(item=><Card item={item} id={item.style+item.code_color} key={item.style+item.code_color}></Card>)}
        </div>
    )
}
export default Dashboard;