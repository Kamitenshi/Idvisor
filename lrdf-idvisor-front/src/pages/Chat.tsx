import { IonButton, IonPage } from '@ionic/react'
import Cookie from 'js-cookie'
import { UserData } from 'lrdf-idvisor-model'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import { getUser } from '../features/session/sessionSlice'
import { socket } from '../utils/httpclient'

interface ChatInterface {
    user: UserData
}

const Chat: React.FC<ChatInterface> = ({ user }) => {
    const callbackSend = () => {
        socket.emit('init', Cookie.get('jwt'))

    }
    const callbackGet = () => {
        socket.emit('message')
    }

    return (
        <IonPage>
            <h1>Chat</h1>
            <IonButton onClick={callbackSend}>Envoyer</IonButton>
            <IonButton onClick={callbackGet}>Get</IonButton>
        </IonPage>

    )
}

const dispatchToProps = (state: RootState) => ({
    user: getUser(state)
})

export default connect(dispatchToProps)(Chat)