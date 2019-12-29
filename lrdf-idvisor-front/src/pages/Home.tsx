// @ts-nocheck
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { createSelector } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { logout, signin } from "../features/session/sessionSlice";
import SignupForm from '../features/session/SignupForm';
import './Home.css';

const sessionSelector = state => state.session

const username = createSelector(
  sessionSelector,
  session => {
    return session.username
  }
)
const mapState = state => ({
  username: username(state)
})

const HomePage: React.FC = ({ username }) => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const buttonLogout = () => {
    dispatch(logout())
  }

  const submit = () => {
    dispatch(signin(email, password))
  }

  const connectedInfo = username ? (
    <div>
      <h1>Nom utilisateur: {username}</h1>
      <IonButton onClick={buttonLogout}>
        Logout
        </IonButton>
    </div>) : null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {connectedInfo}
        <h1>Connect</h1>
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>

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
          <IonButton expand={true} type='submit'>Log in</IonButton>
        </form>
        <SignupForm />
      </IonContent>
    </IonPage >
  );
};

export default connect(mapState)(HomePage);
