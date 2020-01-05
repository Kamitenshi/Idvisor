import { IonButton, IonContent, IonItem, IonLabel, IonList, IonPage, IonSplitPane, IonText, IonTitle, IonToolbar } from '@ionic/react'
import Cookie from 'js-cookie'
import { UserData } from 'lrdf-idvisor-model'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import { getUser } from '../features/session/sessionSlice'
import { socket } from '../utils/httpclient'

interface ChatInterface {
    user: UserData
}

const SideBar: React.FC = () => {
    return (
        <IonContent>
            <IonToolbar>
                <IonTitle>Conversations</IonTitle>
            </IonToolbar>

            <IonList>
                <IonItem>
                    <IonLabel>User</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>User</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>User</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>User</IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
    )
}

const Chat: React.FC<ChatInterface> = ({ user }) => {
    socket.emit('init', Cookie.get('jwt'))
    const callbackGet = () => {
        socket.emit('message')
    }

    const [message, setMessage] = useState('')
    socket.on('coucou', (content: any) => setMessage(content))

    return (
        <IonSplitPane contentId='main'>
            <SideBar />
            <IonPage id='main'>
                <h1>Chat</h1>
                <IonText>Response: {message}</IonText>
                <IonText>Test: {test}</IonText>
                <IonButton onClick={callbackGet}>Get</IonButton>
            </IonPage>
        </IonSplitPane>


    )
}

const dispatchToProps = (state: RootState) => ({
    user: getUser(state)
})

export default connect(dispatchToProps)(Chat)