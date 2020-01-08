import { IonItem, IonLabel, IonList } from '@ionic/react'
import { UserData } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../app/rootReducer'
import { Subtitle } from '../../components/CustomText'
import { getData, getToken } from '../../utils/httpclient'
import { getUser } from '../session/sessionSlice'

interface StudentProfileInterface {
    user: UserData
}

interface Recommandation {

}

interface Interest {
    id: number
    name: string

}

interface Workshop {
    name: string
}

const StudentProfilePage: React.FC<StudentProfileInterface> = ({ user }) => {
    const [recommandations, setRecommandations] = useState<Recommandation[]>()
    const [interests, setInterests] = useState<Interest[]>()
    const [workshops, setWorkshops] = useState<Workshop[]>()

    useEffect(() => {
        const init = async () => {
            let response = (await getData('workshop', 'student/workshops', { cookie: getToken() })).data
            const { workshops } = response.result
            setWorkshops(workshops)
            response = (await getData('user', 'students/interest', { cookie: getToken() })).data
            const interests = response.result
            setInterests(interests)
        }

        init()
    }, [])

    const displayedWorkshop = workshops ? workshops.map((workshop, key) => <IonItem key={key}><IonLabel>{workshop.name}</IonLabel></IonItem>) : null
    const displayedInterests = interests ? interests.map((interest, key) => <IonItem key={key}><IonLabel>{interest.name}</IonLabel></IonItem>) : null
    return (
        <>
            <Subtitle>Centres d'intérêts</Subtitle>
            <IonList>{displayedInterests}</IonList>
            <Subtitle>Ateliers en cours</Subtitle>
            <IonList>{displayedWorkshop}</IonList>
        </>
    )
}

const mapToProps = (state: RootState) => ({
    user: getUser(state)
})

export default connect(mapToProps)(StudentProfilePage)