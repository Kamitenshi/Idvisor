import { IonButton, IonContent } from '@ionic/react'
import { Role, University } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from '../app/rootReducer'
import { Subtitle, Text, Title } from '../components/CustomText'
import PageWithMenu from '../components/PageWithMenu'
import { getRole } from '../features/session/sessionSlice'
import { getData } from '../utils/httpclient'

interface UniversityInterface extends RouteComponentProps<{
    name: string
}> {
    role: Role
}

const dispatchToProps = (state: RootState) => ({
    role: getRole(state)
})

const UniversityPage: React.FC<UniversityInterface> = ({ role, match }) => {
    const [name, setName] = useState(match.params.name)
    const [university, setUniversity] = useState<University>()

    //const [curriculumList, setCurriculumList] = useState<Curriculum[]>([])

    useEffect(() => {
        async function getUniversity(name: string) {
            return ((await (await getData('university', 'get')).data.result) as University)
        }
        getUniversity(name).then(res => setUniversity(res))
    }, [name])

    const editComponents = (role: Role) => {
        if (role === "advisor") {
            return <IonButton onClick={() => { console.log("fixme") }}>Modifier le profil de l'université</IonButton>
        }
    }

    const listCurriculums = () => {

        /* return (
             <IonList>
                 {curriculumList.map((curriculum) => {
                     return (
                         <IonItem routerLink={'curriculum/page/' + curriculum.name}>
                             <IonRow>
                                 {curriculum.name}
                             </IonRow></IonItem>
                     )
                 })}
             </IonList>
         )*/
    }

    const universityInformation = university ? (<div>
        <Text>Cette université est localisée dans la ville de {university.city} ({university.postalCode}), à l'adresse : {university.address} </Text> <br></br><br></br>
        <Text>Description : {university.description}</Text><br></br></div>)
        : null

    return (
        <PageWithMenu title="Détails de l'université">
            <IonContent>
                <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                {editComponents(role)}
                <Title>Page de l'université{name}</Title>
                {universityInformation}
                <Subtitle>Liste des formations proposées</Subtitle>
            </IonContent>
        </PageWithMenu>
    )
}
export default connect(dispatchToProps)(UniversityPage)