import { IonButton, IonContent } from '@ionic/react'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import PageWithMenu from '../components/PageWithMenu'
import UniversityForm from '../features/content-management/UniversityForm'

interface UniversityInterface extends RouteComponentProps { }

const University: React.FC<UniversityInterface> = () => {

    return (
        <PageWithMenu title='Université'>
            <IonContent>
                <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                <UniversityForm />
            </IonContent>
        </PageWithMenu>
    )
}

export default University