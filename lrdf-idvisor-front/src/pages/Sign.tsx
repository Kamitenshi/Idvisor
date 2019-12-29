import { IonPage } from '@ionic/react'
import React from 'react'
import SignupForm from '../features/session/SignupForm'

interface SignInterface { }

const Sign: React.FC<SignInterface> = () => {
    return (
        <IonPage>
            <SignupForm />
        </IonPage>
    )
}

export default Sign