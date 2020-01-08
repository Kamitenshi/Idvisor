import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { appName } from '../constants/name';
import './Home.css';

interface HeaderInterface { }

const Header: React.FC<HeaderInterface> = () => {
  return (<IonHeader>
    <IonToolbar>
      <IonButtons slot='start'>
        <IonTitle>{appName}</IonTitle>
      </IonButtons>
      <IonButtons slot='end'>
        <IonButton id='button-signup' routerLink='/sign/signup' routerDirection='forward'>S'inscrire</IonButton>
        <IonButton routerLink='/sign/signin'>Se connecter</IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>)
}


interface HomeInterface {
}

const HomePage: React.FC<HomeInterface> = () => {

  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol id='title-cell'>
              <IonText color='primary' class='title' id='main-title'>Idvisor</IonText>
              <IonText color='secondary' class='title' id='subtitle'>Trouver sa formation dans le numérique</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default HomePage;
