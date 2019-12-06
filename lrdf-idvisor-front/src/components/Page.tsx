import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

interface PageProps {
    title: string;
}

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

const Page: React.FC<PageProps> = ({ title, children }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>{capitalize(title)}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {children}
            </IonContent>
        </IonPage>
    )
}

export default Page;