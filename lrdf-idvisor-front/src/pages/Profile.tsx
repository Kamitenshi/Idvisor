import { Role } from 'lrdf-idvisor-model'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import { Title } from '../components/CustomText'
import PageWithMenu from '../components/PageWithMenu'
import AdminProfile from '../features/profile/AdminProfile'
import StudentProfile from '../features/profile/StudentProfile'
import { getRole, getUsername } from '../features/session/sessionSlice'

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
            <Title>Bienvenu sur votre profil {username}</Title>
            {content()}
        </PageWithMenu>
    )
}

const mapProps = (state: RootState) => ({
    username: getUsername(state),
    role: getRole(state)
})

export default connect(mapProps)(Profile)