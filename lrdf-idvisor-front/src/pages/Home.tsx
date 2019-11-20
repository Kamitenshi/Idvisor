import React from 'react';
import './Home.scss';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonIcon, IonLabel, IonButton, IonCardContent } from '@ionic/react';


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
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            Découvrir les métiers du numérique
                        </IonCardTitle>
                    </IonCardHeader>
                </IonCard>
                <IonCard>
                    <IonItem>
                        <IonIcon name="pin" slot="start" />
                        <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                        <IonButton fill="outline" slot="end">View</IonButton>
                    </IonItem>

                    <IonCardContent>
                        This is content, without any paragraph or header tags,
                        within an ion-cardContent element.
      </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonItem href="#" class="activated">
                        <IonIcon name="wifi" slot="start" />
                        <IonLabel>Card Link Item 1 .activated</IonLabel>
                    </IonItem>

                    <IonItem href="#">
                        <IonIcon name="wine" slot="start" />
                        <IonLabel>Card Link Item 2</IonLabel>
                    </IonItem>

                    <IonItem class="activated">
                        <IonIcon name="warning" slot="start" />
                        <IonLabel>Card Button Item 1 .activated</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonIcon name="walk" slot="start" />
                        <IonLabel>Card Button Item 2</IonLabel>
                    </IonItem>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default Home;