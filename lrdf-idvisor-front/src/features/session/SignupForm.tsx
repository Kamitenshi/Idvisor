// @ts-nocheck
import { IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from "./sessionSlice";

const SignupForm: React.FC = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => { dispatch(signup(email, password)) }
    return (<form onSubmit={(e) => { e.preventDefault(); submit() }}>
        <h1>Création d'un utilisateur</h1>
        <IonList>
            <IonItem>
                <IonLabel>Email</IonLabel>
                <IonInput name="email" type="email" value={email} onIonChange={(e) => setEmail(e.target.value)} />
            </IonItem>
            <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput name="password" type="password" value={password} onIonChange={(e) => setPassword(e.target.value)} />
            </IonItem>
        </IonList>
        <IonButton expand={true} type='submit'>Signup</IonButton>
    </form>)
}

export default SignupForm