import { IonButton, IonContent, IonPage } from '@ionic/react'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import SigninForm from '../features/session/SigninForm'
import SignupForm from '../features/session/SignupForm'

interface SignInterface extends RouteComponentProps<{
    type: 'signup' | 'signin'
}> { }

const Sign: React.FC<SignInterface> = ({ match }) => {
    const [type, setType] = useState(match.params.type)

    const components = type === 'signin' ?
        {
            form: <SigninForm />,
            button: <IonButton color='secondary' onClick={_ => setType('signup')}>Créer un compte</IonButton>
        } :
        {
            form: <SignupForm />,
            button: <IonButton color='secondary' onClick={_ => setType('signin')}>Se connecter</IonButton>
        }


    return (
        <IonPage>
            <IonContent>
                <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                {components.form}
                {components.button}
            </IonContent>
        </IonPage>
    )
}

export default Sign