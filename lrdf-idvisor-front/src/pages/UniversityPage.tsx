import { IonButton, IonContent, IonItem, IonList, IonRow } from '@ionic/react'
import { connect } from 'http2'
import { Role, University } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
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
    const [curriculumList, setCurriculumList] = useState<Curriculum[]>([])

    useEffect(() => {
        async function getUniversity(name: string) {
            return ((await (await getData('university', 'all')).data.result) as University)
        }
        getUniversity(name).then(res => setUniversity(res))
    }, [name])

    const editComponents = (role: Role) => {
        if (role === "advisor") {
            return <IonButton onClick={() => { console.log("fixme") }}>Modifier le profil de l'université</IonButton>
        }
    }

    return (
        <PageWithMenu title="Détails de l'université">
            <IonContent>
                <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                {editComponents(role)}
                <Title>{name}</Title>
                <Text>Cette université est localisée dans la ville de {university?.city} ({university?.postalCode}), à l'adresse : {university?.address} </Text>
                <Text>Description : {university?.description}</Text>
                <Subtitle>Liste des formations proposées</Subtitle>
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
            </IonContent>
        </PageWithMenu>
    )


}
export default connect(dispatchToProps)(UniversityPage)