import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { createuniversity } from './contentSlice';

const SigninForm: React.FC<RouteComponentProps> = ({ history }) => {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [postalCode, setPostalCode] = useState<string>('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const redirect = () => {
        history.push('/university')
    }

    const createIonInput = (label: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (
            <IonItem>
                <IonLabel>{label}</IonLabel>
                <IonInput type="text" autofocus={true} required={true}
                    onIonInput={(e) => setter((e.target as HTMLInputElement).value)} />
            </IonItem>
        )
    }

    const submit = () => {
        createuniversity(name, description, address, city, postalCode, redirect, setError, setSuccess)
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>
            <h1>Ajouter une Université</h1>
            <IonList>
                {createIonInput("Nom de l'université", setName)}
                {createIonInput("Description de l'université", setDescription)}
                {createIonInput("Adresse de l'université (N° et rue)", setAddress)}
                {createIonInput("Ville de l'université", setCity)}
                {createIonInput("Code postal de la ville de l'université", setPostalCode)}
                {error ? <IonText color='danger'><IonLabel>{error}</IonLabel></IonText> : null}
                {success ? <IonText color='success'><IonLabel>{success}</IonLabel></IonText> : null}
            </IonList>
            <IonButton type='submit'>Créer l'Université</IonButton>
        </form>
    )
}

export default withRouter(SigninForm)