import { IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../app/rootReducer'
import PageWithMenu from '../../components/PageWithMenu'
import { getUser, User } from './sessionSlice'

interface SettingsPage {
    user: User
}

type TextFieldTypes = 'password' | 'email' | 'text'

const SettingsPage: React.FC<SettingsPage> = ({ user }) => {

    const { email, username } = user

    const [newValue, setNewValue] = useState('')
    const [newInput, setNewInput] = useState(<></>)
    const [currentPassword, setCurrentPassword] = useState('')

    const handleValidate = () => {

    }

    const displayModifyField = (field: string, name: string, type: TextFieldTypes) => {
        return () => {
            setNewValue('')
            setNewInput(
                <>
                    <IonItem>
                        <IonLabel color='danger'>Nouveau {field} : </IonLabel>
                        <IonInput type={type} name={name} value={newValue}
                            onIonInput={(e) => setNewValue((e.target as HTMLInputElement).value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel color='danger'>Mot de passe actuel : </IonLabel>
                        <IonInput type={type} name={name} value={currentPassword}
                            onIonInput={(e) => setCurrentPassword((e.target as HTMLInputElement).value)} />
                    </IonItem>
                    <IonButton>Valider la modification</IonButton>
                </>
            )
        }
    }


    return (
        <PageWithMenu title='Settings'>
            <IonList>
                <IonItem>
                    <IonLabel>Email actuel : {email}</IonLabel>
                    <IonButton onClick={displayModifyField('e-mail', 'email', 'email')}>Modifier</IonButton>
                </IonItem>
                <IonItem>
                    <IonLabel>Nom d'utilisateur actuel : {username}</IonLabel>
                    <IonButton onClick={displayModifyField("nom d'utilisateur", 'username', 'text')}>Modifier</IonButton>
                </IonItem>
                <IonItem>
                    <IonLabel>Mot de passe</IonLabel>
                    <IonButton onClick={displayModifyField("mot de passe", 'password', 'password')}>Modifier</IonButton>
                </IonItem>
            </IonList>
            {newInput}
        </PageWithMenu>
    )
}

const mapToProps = (state: RootState) => ({
    user: getUser(state)
})

export default connect(mapToProps)(SettingsPage)