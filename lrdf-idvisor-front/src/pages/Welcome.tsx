import { IonButton, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption } from '@ionic/react'
import { UserData } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from '../app/rootReducer'
import { Subtitle, Text, Title } from '../components/CustomText'
import { getUser } from '../features/session/sessionSlice'
import { getData, postData } from '../utils/httpclient'

interface WelcomeInterface extends RouteComponentProps {
    user: UserData
}

interface Field {
    name: string
    id: number
}

const Welcome: React.FC<WelcomeInterface> = ({ user, history }) => {
    const [fields, setFields] = useState<Field[]>([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const init = async () => {
            const response = (await getData("curriculum", "fields")).data
            console.log(JSON.stringify(response.result.fields));

            setFields(response.result)
            setRefresh(false)
        }
        init()
    }, [refresh])

    const [interests, setInterests] = useState<string[]>([])
    const [newField, setNewfield] = useState<string>()

    const createNewField = async () => {
        const name = newField
        if (name) {
            await postData("curriculum", "create/field", { name })
            setInterests([...interests, name])
            setRefresh(true)
        }
    }

    const [sentFields, setSentFields] = useState<number[]>([])

    const handleSelect = async (values: any) => {
        const names = values.map((field: any) => field.name)
        const ids = values.map((f: any) => f.id)
        setInterests(names)
        setSentFields(ids)
    }

    const send = async () => {
        await postData("user", "add/fields", { id: user.id, fields: sentFields })
        history.push('/profile')
    }

    const displayedFields = fields.map((field, key) => <IonSelectOption value={field} key={key}>{field.name}</IonSelectOption>)
    const displayedInterests = interests.map((field, key) => <IonItem key={key}><IonLabel>{field}</IonLabel></IonItem>)
    return (
        <IonPage>
            <Title>Indiquer vos centres d'intérêts</Title>
            <Text>Ceux-ci seront pris en compte afin de vous proposer des recommandations</Text>
            <IonItem>
                <IonSelect multiple={true} onIonChange={(e) => handleSelect((e.target as HTMLInputElement).value)}>
                    {displayedFields}
                </IonSelect>
            </IonItem>
            <IonInput type="text" value={newField} placeholder="Indiquer un nouveaux centre d'intérêt"
                onIonChange={(e) => setNewfield((e.target as HTMLInputElement).value)} />
            <IonButton onClick={createNewField}>Nouveau centre d'intérêt</IonButton>
            <Subtitle>Les centres d'intérêts que vous voulez envoyer</Subtitle>
            <IonList>
                {displayedInterests}
            </IonList>
            <IonButton onClick={send}>Envoyer vos centres d'intérêts</IonButton>
        </IonPage>
    )

}

const dispatchToProps = (state: RootState) => ({
    user: getUser(state)
})

export default connect(dispatchToProps)(withRouter(Welcome))