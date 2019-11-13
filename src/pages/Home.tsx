import React from 'react';
import './Home.scss';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react';


interface HomeProps { };

const Home: React.FC<HomeProps> = () => {
    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent />
        </IonPage>
    );
}

export default Home;