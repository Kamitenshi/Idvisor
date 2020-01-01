import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { signin } from './sessionSlice';

const SigninForm: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const redirect = () => {
        history.push('/profile')
    }

    const submit = () => {
        dispatch(signin(email, password, redirect, setError))
    }
    return (
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>
            <h1>Se connecter</h1>
            <IonList>
                <IonItem>
                    <IonLabel>E-mail</IonLabel>
                    <IonInput name="email" type="email" value={email} autofocus={true} required={true}
                        onIonInput={(e) => setEmail((e.target as HTMLInputElement).value)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Mot de passe</IonLabel>
                    <IonInput name="password" type="password" value={password} clearOnEdit={false} required={true}
                        onIonInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                    />
                </IonItem>
                <IonText color='danger'>
                    {error ? <IonLabel>{error}</IonLabel> : null}
                </IonText>
            </IonList>
            <IonButton type='submit'>Se connecter</IonButton>
        </form>
    )
}

export default withRouter(SigninForm)