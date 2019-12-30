import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { signupStudent } from "./sessionSlice";

const SignupForm: React.FC<RouteComponentProps> = ({ history }) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [error, setError] = useState('')

    const checkPassword = (value: string) => {
        if (confirmationPassword && confirmationPassword !== password) {
            setError('Les mots de passe ne sont pas identiques')
        }
    }

    const redirect = () => {
        history.push('/profile')
    }

    const submit = () => {
        if (username && email && password && confirmationPassword) {
            dispatch(signupStudent(username, email, password, redirect, setError))
        }
        else {
            setError('Tous les champs ne sont pas remplis')
        }
    }

    return (<form onSubmit={(e) => { e.preventDefault(); submit() }}>
        <h1>Création d'un utilisateur</h1>
        <IonList>
            <IonItem>
                <IonLabel>Nom utilisateur</IonLabel>
                <IonInput name="username" type="text" value={username} onIonChange={(e) => setUsername((e.target as HTMLInputElement).value)} />
            </IonItem>
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
                {error ? <IonLabel>{error}</IonLabel> : null}
            </IonText>
        </IonList>
        <IonButton type='submit'>Créer le compte</IonButton>
    </form>)
}

export default withRouter(SignupForm)