import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonRow, IonText } from '@ionic/react'
import { Curriculum, Role, University } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from '../app/rootReducer'
import { Subtitle, Text, Title } from '../components/CustomText'
import PageWithMenu from '../components/PageWithMenu'
import { createCurriculum } from '../features/content-management/contentSlice'
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
    const [refresh, setRefresh] = useState<number>(0)
    const [listCurriculums, setListCurriculums] = useState<JSX.Element>()

    useEffect(() => {
        async function getUniversity(name: string) {
            return ((await (await getData('university', 'get', { name })).data.result) as University)
        }
        getUniversity(name).then(res => setUniversity(res))
    }, [name, refresh])

    useEffect(() => { setListCurriculums(calculateList()); console.log("pas encore............;") }, [university])

    const calculateList = () => {
        if (university) {
            console.log(university.curriculums)
            return (
                <IonList>
                    {university.curriculums.map((curriculum: Curriculum) => {
                        return (
                            <IonItem routerLink={university.name} onClick={() => openlink(curriculum)}>
                                <IonRow>
                                    {curriculum.name} : {curriculum.description}
                                </IonRow></IonItem>
                        )
                    })}
                </IonList>
            )
        }
        else {
            return <Text>Aucune formation renseignée pour le moment !</Text>
        }
    }


    const editComponents = (role: Role) => {

    }

    const openlink = (curriculum: Curriculum) => {
        let url = curriculum.url.search("www.") === -1 ? "www." + curriculum.url : curriculum.url
        url = curriculum.url.search("http://") === -1 ? "http://" + curriculum.url : curriculum.url
        window.open(url, "_blank")
    }

    const CurriculumForm = () => {
        const [name, setName] = useState<string>('')
        const [description, setDescription] = useState<string>('')
        const [url, setUrl] = useState<string>('')
        const [error, setError] = useState('')
        const [success, setSuccess] = useState('')

        const createIonInput = (label: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
            return (
                <IonItem>
                    <IonLabel position="stacked">{label}</IonLabel>
                    <IonInput required={true} onIonInput={(e) => setter((e.target as HTMLInputElement).value)} />
                </IonItem>
            )
        }

        async function submit() {
            if (university) {
                await createCurriculum(name, description, url, university, setError, setSuccess)
                setRefresh(refresh + 1)
            }
        }

        if (role === 'advisor') {
            return (
                <form onSubmit={(e) => { e.preventDefault(); submit() }}>
                    <br></br>
                    <Subtitle>Ajouter une formation</Subtitle>
                    <IonList>
                        {createIonInput("Nom de la formation", setName)}
                        {createIonInput("Description de la formation", setDescription)}
                        {createIonInput("Lien web vers la formation", setUrl)}
                        {error ? <IonText color='danger'><IonLabel>{error}</IonLabel></IonText> : null}
                        {success ? <IonText color='success'><IonLabel>{success}</IonLabel></IonText> : null}
                    </IonList>
                    <IonButton type='submit'>Créer la formation</IonButton>
                    <br></br>
                    <br></br>
                </form>
            )
        }
    }

    const universityInformation = university ? (<div>
        <Text>Cette université est localisée dans la ville de {university.city} ({university.postalCode}), à l'adresse : {university.address} </Text> <br></br><br></br>
        <Text>Site web de l'université : {university.url}</Text><br></br><br></br>
        <Text>Description : {university.description}</Text><br></br></div>)
        : null

    return (
        <PageWithMenu title="Détails de l'université">
            <IonContent>
                <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                {editComponents(role)}
                <Title>Page de l'université {name}</Title>
                {universityInformation}
                {CurriculumForm()}
                <Subtitle>Liste des formations proposées</Subtitle>
                {listCurriculums}
            </IonContent>
        </PageWithMenu>
    )
}
export default connect(dispatchToProps)(UniversityPage)