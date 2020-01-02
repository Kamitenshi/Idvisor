import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import PageWithMenu from '../components/PageWithMenu'
import AdminProfile from '../features/profile/AdminProfile'
import StudentProfile from '../features/profile/StudentProfile'
import { getRole, getUsername, Role } from '../features/session/sessionSlice'

interface ProfileInterface {
    username: string,
    role: Role
}

const Profile: React.FC<ProfileInterface> = ({ username, role }) => {
    const content = () => {
        if (role === 'student') {
            return <StudentProfile />
        } else if (role === 'admin') {
            return <AdminProfile />
        }
    }
    return (
        <PageWithMenu title='Profile'>
            <h1>Bienvenu sur votre profile {username}</h1>
            {content()}
        </PageWithMenu>
    )
}

const mapProps = (state: RootState) => ({
    username: getUsername(state),
    role: getRole(state)
})

export default connect(mapProps)(Profile)