import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { capitalize } from '../utils/string'

interface PageInterface {
    title: string
}

const PageWithMenu: React.FC<PageInterface> = ({ title, children }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{(capitalize(title))}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {children}
            </IonContent>
        </IonPage >
    )
}

export default PageWithMenu