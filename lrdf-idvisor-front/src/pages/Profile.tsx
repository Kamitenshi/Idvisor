import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import PageWithMenu from '../components/PageWithMenu'

interface ProfileInterface {
    username: string
}

const Profile: React.FC<ProfileInterface> = ({ username }) => {
    return (
        <PageWithMenu title='Profile'>
            <h1>Bienvenu sur votre profile {username}</h1>
        </PageWithMenu>
    )
}

const mapProps = (state: RootState) => ({ username: state.session.username })

export default connect(mapProps)(Profile)