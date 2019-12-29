import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from "./sessionSlice";

const SignupForm: React.FC = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [errorConfirmation, setErrorConfirmation] = useState(false)

    const checkPassword = (value: string) => {
        if (confirmationPassword) {
            setErrorConfirmation(confirmationPassword !== password)
        }
    }

    const submit = () => { dispatch(signup(email, password)) }

    return (<form onSubmit={(e) => { e.preventDefault(); submit() }}>
        <h1>Création d'un utilisateur</h1>
        <IonList>
            <IonItem>
                <IonLabel>E-mail</IonLabel>
                <IonInput name="email" type="email" value={email} onIonChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
            </IonItem>
            <IonItem>
                <IonLabel>Mot de passe</IonLabel>
                <IonInput name="password" type="password" value={password}
                    onIonChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                    onIonBlur={(e) => checkPassword((e.target as HTMLInputElement).value)} />
            </IonItem>
            <IonItem>
                <IonLabel>Confirmer le mot de passe</IonLabel>
                <IonInput name="confirmationPassword" type="password" value={confirmationPassword}
                    onIonChange={(e) => setConfirmationPassword((e.target as HTMLInputElement).value)}
                    onIonBlur={(e) => checkPassword((e.target as HTMLInputElement).value)} />
            </IonItem>
            <IonText color='danger'>
                {errorConfirmation ? <IonLabel>Les mots de passe ne sont pas identiques</IonLabel> : null}
            </IonText>
        </IonList>
        <IonButton type='submit'>Créer le compte</IonButton>
    </form>)
}

export default SignupForm