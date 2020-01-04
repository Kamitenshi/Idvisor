import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { createuniversity } from './contentSlice';

const SigninForm: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const redirect = () => {
        history.push('/university/all')
    }

    const submit = () => {
        createuniversity(name, redirect, setError)
    }
    return (
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>
            <h1>Ajouter une Université</h1>
            <IonList>
                <IonItem>
                    <IonLabel>Nom de l'Université</IonLabel>
                    <IonInput name="email" type="text" value={name} autofocus={true} required={true}
                        onIonInput={(e) => setName((e.target as HTMLInputElement).value)} />
                </IonItem>
                <IonText color='danger'>
                    {error ? <IonLabel>{error}</IonLabel> : null}
                </IonText>
            </IonList>
            <IonButton type='submit'>Créer l'Université</IonButton>
        </form>
    )
}

export default withRouter(SigninForm)