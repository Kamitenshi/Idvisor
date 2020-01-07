import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Subtitle, Title } from '../../components/CustomText'
import PageWithMenu from '../../components/PageWithMenu'
import { getData, postData } from '../../utils/httpclient'
import { mapInList } from '../../utils/list'

interface WorkshopInterface extends RouteComponentProps<
    {
        name: string,
        id: string
    }> { }

interface Student {
    id: number
    username: string
}
const Workshop: React.FC<WorkshopInterface> = ({ match }) => {
    const name = match.params.name
    const id = match.params.id
    const [students, setStudents] = useState()
    const [skills, setSkills] = useState()
    const [advisors, setAdvisors] = useState()

    useEffect(() => {
        async function initState() {
            const response = (await getData("workshop", "information", { id })).data.result
            const { students, skills, advisors } = response
            console.log(JSON.stringify(response));
            setStudents(students)
            setSkills(skills)
            setAdvisors(advisors)
        }
        initState()
    }, [])


    const displayedStudents = students ? mapInList(students, (student, key) => <IonItem key={key}>{student.username}</IonItem>) : null
    const displayedSkills = skills ? mapInList(skills, (skill, key) => <IonItem key={key}>{skill.name}</IonItem>) : null
    const displayedAdvisors = advisors ? mapInList(advisors, (advisor, key) => <IonItem key={key}>{advisor.username}</IonItem>) : null


    const [allStudents, setAllStudents] = useState<Student[]>([])
    const [newSkill, setNewSkill] = useState<string>()
    const [newStudents, setNewstudents] = useState<number>()

    useEffect(() => {
        async function getAllStudents() {
            const response = (await getData('user', 'students')).data
            setAllStudents(response.result)
        }
        getAllStudents()
    }, [])

    const displayedAllStudents = allStudents ? allStudents.map(student => <IonSelectOption value={student.id}> {student.username}</IonSelectOption >)
        : null

    const handleSelect = async (idStudents: any) => {
        await postData('workshop', 'add/student', { idStudents, workshopId: id })
    }


    return (
        <PageWithMenu title="Gestion d'un atelier">
            <Title>{name}</Title>
            <Subtitle>Elèves</Subtitle>
            {displayedStudents}
            <IonItem>
                <IonLabel>Sélectionner de nouveaux élèves</IonLabel>
                <IonSelect multiple={true} onIonChange={e => handleSelect((e.target as HTMLInputElement).value)}>
                    {displayedAllStudents}
                </IonSelect>
            </IonItem>
            <Subtitle>Compétences</Subtitle>
            {displayedSkills}
            <IonInput type="text" />
            <IonButton>Ajouter une compétence</IonButton>
            <Subtitle>Animateurs</Subtitle>
            {displayedAdvisors}
        </PageWithMenu>
    )
}

export default Workshop