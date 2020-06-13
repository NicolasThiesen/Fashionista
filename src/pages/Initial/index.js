import React from 'react'


import { Dashboard } from '../../components'
import { connect } from 'react-redux';

const Initial = ({data}) => {
    
    return (
        <Dashboard data={data}></Dashboard>
    )
};

export default connect(state=> ({data: state.data}))(Initial);