import { IonButton, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Title } from '../../components/CustomText';
import { createuniversity } from './contentSlice';

const UniversityForm: React.FC<RouteComponentProps> = ({ history }) => {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [postalCode, setPostalCode] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const redirect = () => {
        history.push('/university')
    }

    const createIonInput = (label: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (
            <IonItem>
                <IonLabel position="stacked">{label}</IonLabel>
                <IonInput required={true} onIonInput={(e) => setter((e.target as HTMLInputElement).value)} />
            </IonItem>
        )
    }

    const submit = () => {
        createuniversity(name, description, address, city, postalCode, url, redirect, setError, setSuccess)
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>
            <Title>Ajouter une Université</Title>
            <IonList>
                {createIonInput("Nom de l'université", setName)}
                {createIonInput("Description de l'université", setDescription)}
                {createIonInput("Adresse de l'université (N° et rue)", setAddress)}
                {createIonInput("Ville de l'université", setCity)}
                {createIonInput("Code postal de la ville de l'université", setPostalCode)}
                {createIonInput("Adresse du site web de l'université", setUrl)}
                {error ? <IonText color='danger'><IonLabel>{error}</IonLabel></IonText> : null}
                {success ? <IonText color='success'><IonLabel>{success}</IonLabel></IonText> : null}
            </IonList>
            <IonButton type='submit'>Créer l'Université</IonButton>
        </form>
    )
}

export default withRouter(UniversityForm)