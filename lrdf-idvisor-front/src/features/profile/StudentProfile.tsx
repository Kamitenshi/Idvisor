import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../app/rootReducer'
import { displayList } from '../../utils/list'
import { getUsername } from '../session/sessionSlice'
import { getInterests, getRecommandations, getSkills, StudentProfile } from './profileSlice'

type StudentProfileInterface = {
} & StudentProfile


const StudentProfilePage: React.FC<StudentProfileInterface> = ({ recommandations, interests, skills }) => {
    return (
        <>
            <h1>Recommandations</h1>
            {displayList(recommandations)}
            <h1>Interests</h1>
            {displayList(interests)}
            <h1>Skills</h1>
            {displayList(skills)}
        </>
    )
}

const mapToProps = (state: RootState) => ({
    username: getUsername(state),
    recommandations: getRecommandations(state),
    interests: getInterests(state),
    skills: getSkills(state)
})

export default connect(mapToProps)(StudentProfilePage)