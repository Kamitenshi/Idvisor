import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react'
import { home, settings } from 'ionicons/icons'
import React from 'react'
import { AppPage } from '../declarations'
import { capitalize } from '../utils/string'
import Menu from './Menu'

interface PageInterface {
    title: string
}

const PageWithMenu: React.FC<PageInterface> = ({ title, children }) => {
    const appPages: AppPage[] = [
        {
            title: 'Home',
            url: '/home',
            icon: home
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: settings
        }
    ];
    return (
        <IonSplitPane contentId='main'>
            <Menu appPages={appPages} />
            <IonPage id="main">
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
        </IonSplitPane>
    )
}

export default PageWithMenu