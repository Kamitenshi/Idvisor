import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react'
import { UserData } from 'lrdf-idvisor-model'
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { RootState } from '../app/rootReducer'
import PageWithMenu from '../components/PageWithMenu'
import { getUser, modifyField } from '../features/session/sessionSlice'

interface SettingsPage {
    user: UserData
}

type TextFieldTypes = 'password' | 'email' | 'text'

const SettingsPage: React.FC<SettingsPage> = ({ user }) => {
    const { email, username } = user

    const [newValue, setNewValue] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [serverError, setServerError] = useState('')


    const dispatch = useDispatch()
    const handleValidate = (field: string) => {
        console.log("New value: " + newValue);
        dispatch(modifyField(email, newValue, field, currentPassword, setServerError))
    }


    const [field, setField] = useState('')
    const [type, setType] = useState<TextFieldTypes>("text")
    const [name, setName] = useState('')

    const modifyEmail = () => { setField('email'); setType('email'); setName('email') }


    let inputForm = null
    if (field)
        inputForm = (<form onSubmit={(e) => { e.preventDefault(); handleValidate(name) }}>

            <IonItem>
                <IonLabel color='danger'>Nouveau {field} : </IonLabel>
                <IonInput type={type} name={name} value={newValue}
                    onIonInput={(e) => { setNewValue((e.target as HTMLInputElement).value) }} />
            </IonItem>
            <IonItem>
                <IonLabel color='danger'>Mot de passe actuel : </IonLabel>
                <IonInput type='password' name={name} value={currentPassword}
                    onIonInput={(e) => setCurrentPassword((e.target as HTMLInputElement).value)} />
            </IonItem>
            <IonButton type='submit'>Valider la modification</IonButton>
            <IonText color='danger'>{serverError}</IonText>
        </form>)

    return (
        <PageWithMenu title='Settings'>
            <IonList>
                <IonItem>
                    <IonLabel>Email actuel : {email}</IonLabel>
                    <IonButton onClick={modifyEmail}>Modifier</IonButton>
                </IonItem>
                <IonItem>
                    <IonLabel>Nom d'utilisateur actuel : {username}</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>Mot de passe</IonLabel>
                </IonItem>
            </IonList>
            {inputForm}
        </PageWithMenu>
    )
}

const mapToProps = (state: RootState) => ({
    user: getUser(state)
})

export default connect(mapToProps)(SettingsPage)