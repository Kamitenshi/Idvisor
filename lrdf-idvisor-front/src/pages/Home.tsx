import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { createSelector } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { logout, signin } from "../features/session/sessionSlice";
import SignupForm from '../features/session/SignupForm';
import './Home.css';

interface HomeInterface {
  username: string
}

const sessionSelector = (state: RootState) => state.session

const username = createSelector(
  sessionSelector,
  session => {
    return session.username
  }
)
const mapState = (state: RootState) => ({
  username: username(state)
})

const HomePage: React.FC<HomeInterface> = ({ username }) => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const buttonLogout = () => {
    dispatch(logout)
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
              <IonInput name="email" type="email" value={email} onIonChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
            </IonItem>
            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={(e) => setPassword((e.target as HTMLInputElement).value)} />
            </IonItem>
          </IonList>
          <IonButton type='submit'>Log in</IonButton>
        </form>
        <SignupForm />
      </IonContent>
    </IonPage >
  );
};

export default connect(mapState)(HomePage);
