import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { createuniversity } from './contentSlice';

const SigninForm: React.FC<RouteComponentProps> = ({ history }) => {

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const redirect = () => {
        history.push('/university/all')
    }

    const submit = () => {
        createuniversity(name, redirect, setError, setSuccess)
    }
    return (
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>
            <h1>Ajouter une Université</h1>
            <IonList>
                <IonItem>
                    <IonLabel>Nom de l'Université: </IonLabel>
                    <IonInput name="name" type="text" value={name} autofocus={true} required={true}
                        onIonInput={(e) => setName((e.target as HTMLInputElement).value)} />
                </IonItem>
                {error ? <IonText color='danger'><IonLabel>{error}</IonLabel></IonText> : null}
                {success ? <IonText color='success'><IonLabel>{success}</IonLabel></IonText> : null}
            </IonList>
            <IonButton type='submit'>Créer l'Université</IonButton>
        </form>
    )
}

export default withRouter(SigninForm)