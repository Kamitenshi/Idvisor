import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react'
import { home, school, settings } from 'ionicons/icons'
import { Role } from 'lrdf-idvisor-model'
import React from 'react'
import { capitalize } from '../utils/string'
import Menu from './Menu'

interface PageInterface {
    title: string
}

export interface AppPage {
    url: string
    icon: object
    title: string
    role?: Role
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
        },
        {
            title: 'University',
            url: '/university',
            icon: school,
            role: 'advisor'
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