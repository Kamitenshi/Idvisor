import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from '../../app/rootReducer'

interface ProtectedRouteInterface {
    component: React.ComponentType<any>
    path: string
    isAuthenticated: boolean
}

//TODO: manage when token expires
const ProtectedRoute: React.FC<ProtectedRouteInterface> = ({ isAuthenticated, component: Component, ...rest }) => {
    return (<Route {...rest} render={(rest) =>
        isAuthenticated
            ? <Component {...rest} />
            : <Redirect to='sign/sigin' />} /> //TODO: add a message to explain that authentication is required
    )
}

const authenticated = (state: RootState) => state.session.isAuthenticated

const mapToProps = (state: RootState) => ({
    isAuthenticated: authenticated(state)
})

export default connect(mapToProps)(ProtectedRoute)