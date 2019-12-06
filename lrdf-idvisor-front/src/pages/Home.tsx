import { IonCard, IonCardTitle, IonImg, IonGrid } from '@ionic/react';
import React from 'react';
import Page from '../components/Page';
import './Home.scss';


interface HomeProps { };

const titleImagePath = "assets/img/title.jpeg";

const Home: React.FC<HomeProps> = () => {
    return (
        <Page title="home">
            <IonCard>
                <img src={titleImagePath} />
                <IonCardTitle class="card-title">
                    Découvrir les métiers du numérique
                        </IonCardTitle>
            </IonCard>
        </Page>
    );
}

export default Home;