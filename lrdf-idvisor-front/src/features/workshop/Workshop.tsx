import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react'
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
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function initState() {
            const response = (await getData("workshop", "information", { id })).data.result
            const { students, skills, advisors } = response
            console.log(JSON.stringify(response));
            setStudents(students)
            setSkills(skills)
            setAdvisors(advisors)
            setRefresh(false)
        }
        initState()
    }, [refresh])


    const displayedStudents = students ? mapInList(students, (student, key) => <IonItem key={key}>{student.username}</IonItem>) : null
    const displayedSkills = skills ? mapInList(skills, (skill, key) => <IonItem key={key}>{skill.name}</IonItem>) : null
    const displayedAdvisors = advisors ? mapInList(advisors, (advisor, key) => <IonItem key={key}>{advisor.username}</IonItem>) : null


    const [allStudents, setAllStudents] = useState<Student[]>([])

    useEffect(() => {
        async function getAllStudents() {
            let response = (await getData('user', 'students')).data
            setAllStudents(response.result)
        }
        getAllStudents()
    }, [])

    const displayedAllStudents = allStudents ? allStudents.map(student => <IonSelectOption value={student.id}> {student.username}</IonSelectOption >)
        : null

    const handleSelectStudent = async (idStudents: any) => {
        await postData('workshop', 'add/student', { idStudents, workshopId: id })
        setRefresh(true)
    }

    const handleSelectSKill = async (idSkills: any) => {
        await postData('workshop', 'add/skill', { idSkills, workshopId: id })
        setRefresh(true)
    }


    return (
        <PageWithMenu title="Gestion d'un atelier">
            <Title>{name}</Title>
            <Subtitle>Elèves</Subtitle>
            {displayedStudents}
            <IonItem>
                <IonLabel>Sélectionner les élèves</IonLabel>
                <IonSelect multiple={true} onIonChange={e => handleSelectStudent((e.target as HTMLInputElement).value)}>
                    {displayedAllStudents}
                </IonSelect>
            </IonItem>
            <Subtitle>Animateurs</Subtitle>
            {displayedAdvisors}
        </PageWithMenu>
    )
}

export default Workshop