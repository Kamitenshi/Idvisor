import { IonCard, IonCardContent, IonCardTitle, IonSlide, IonSlides } from '@ionic/react';
import React from 'react';
import Page from '../components/Page';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import { JobDescription } from '../models/JobDescription';
import './Home.scss';

interface SlidesProps { jobDescriptions: JobDescription[] };

const SlidesComp: React.FC<SlidesProps> = ({ jobDescriptions }) => {

    const slideOptions = {
        initialSlide: 0,
        speed: 400,
        autoplay: true,
        autoplayspeed: 400,
    }

    return (<IonSlides pager options={slideOptions}>
        {jobDescriptions.map(job => {
            return (
                <IonSlide>
                    <IonCard>
                        <IonCardTitle>{job.title}</IonCardTitle>
                        <IonCardContent>{job.description}</IonCardContent>
                    </IonCard>
                </IonSlide>
            )
        })}
    </IonSlides>);
}

const Slides: React.FC = connect(
    {
        mapStateToProps: (state) => ({
            jobDescriptions: selectors.getJobsDescription(state)
        }),
        component: SlidesComp
    }
)

const titleImagePath = "assets/img/home-title.jpeg";

const Home: React.FC = () => {
    const title = "Découvrir les métiers du numérique";
    return (
        <Page title="home">
            <IonCard>
                <img src={titleImagePath} alt={title} />
                <IonCardTitle class="card-title">
                    {title}
                </IonCardTitle>
            </IonCard>
            <Slides />
        </Page>
    );
}

export default Home;