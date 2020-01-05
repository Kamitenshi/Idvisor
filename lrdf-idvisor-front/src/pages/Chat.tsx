import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonMenu, IonPage, IonSearchbar, IonSplitPane, IonText, IonTitle, IonToolbar } from '@ionic/react'
import Cookie from 'js-cookie'
import { UserData } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import { getUser } from '../features/session/sessionSlice'
import { getData, socket } from '../utils/httpclient'
import { mapInList } from '../utils/list'

interface ChatInterface {
    user: UserData
}

interface SideBarInterface {
    setter: React.Dispatch<React.SetStateAction<string>>
}

const SideBar: React.FC<SideBarInterface> = ({ setter }) => {
    const [usernames, setUsernames] = useState([])
    const [displayedItems, setDisplayedItems] = useState([])
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        const getUsernames = async () => {
            const response = await getData('user', 'all/username')
            setUsernames(response.data.result.map((value: any) => value.username))
        }
        getUsernames()
        setRefresh(false)
    }, [refresh])

    const handleClick = (usernames: string) => {
        return () => {
            setter(usernames)
        }
    }

    const displayItems = () => {
        const apply = (object: any, index: number) => {
            return (
                <IonItem key={index} onClick={handleClick(object)}>
                    <IonLabel>{object}</IonLabel>
                </IonItem>
            )
        }
        return mapInList(displayedItems, apply)
    }

    const handleSearchbar = (e: CustomEvent) => {
        setSearch((e.target as HTMLInputElement).value)
        setDisplayedItems(
            usernames.filter((value: string) => value.indexOf(search) > -1)
        )
    }

    return (
        <IonMenu type='overlay' side='start' contentId='menuContent'>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Conversations</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent id='menuContent'>
                <IonSearchbar animated={true} value={search}
                    onIonChange={(e) => handleSearchbar(e)} />
                {displayItems()}
            </IonContent>
        </IonMenu>
    )
}

const Chat: React.FC<ChatInterface> = ({ user }) => {
    socket.emit('init', Cookie.get('jwt'))
    const callbackGet = () => {
        socket.emit('message')
    }

    const [message, setMessage] = useState('')
    const [discussionTitle, setDiscussionTitle] = useState('')
    socket.on('coucou', (content: any) => setMessage(content))

    return (
        <IonSplitPane contentId='main'>
            <SideBar setter={setDiscussionTitle} />
            <IonPage id='main'>
                <h1>Chat with {discussionTitle}</h1>
                <IonText>Response: {message}</IonText>
                <IonButton onClick={callbackGet}>Get</IonButton>
            </IonPage>
        </IonSplitPane>


    )
}

const dispatchToProps = (state: RootState) => ({
    user: getUser(state)
})

export default connect(dispatchToProps)(Chat)