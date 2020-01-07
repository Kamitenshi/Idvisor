import { IonText } from '@ionic/react'
import React from 'react'
import './CustomText.css'


export const Title: React.FC = ({ children }) => {
    return (
        <IonText color="primary" class='title'>{children}</IonText>
    )
}

export const Subtitle: React.FC = ({ children }) => {
    return (
        <IonText color="secondary" class='subtitle'>{children}</IonText>
    )
}

export const Text: React.FC = ({ children }) => {
    return (
        <IonText color="tertiary">{children}</IonText>
    )
}