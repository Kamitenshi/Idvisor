import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenu, IonPage, IonSearchbar, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react'
import Cookie from 'js-cookie'
import { Role, UserData } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import { getRole, getUser } from '../features/session/sessionSlice'
import { getData, getToken, socket } from '../utils/httpclient'
import { mapInList } from '../utils/list'


interface SideBarInterface {
    setter: (_: string, __: number) => void
    user: UserData
}

interface UserInfo {
    username: string,
    id: number
}

const SideBar: React.FC<SideBarInterface> = ({ user, setter }) => {
    const [users, setUsers] = useState<UserInfo[]>([])
    const [displayedItems, setDisplayedItems] = useState<any[]>([])
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        const getUserdata = async () => {
            const response = await getData('user', 'chat')
            setUsers(response.data.result
                .map((value: any) => { return { username: value.username, id: value.id } })
                .filter((value: any) => value.username !== user.username))
        }
        getUserdata()
        setRefresh(false)
    }, [refresh])

    const handleClick = (userInfo: UserInfo) => {
        return () => {
            setter(userInfo.username, userInfo.id)
            socket.emit('createConversation', { cookie: Cookie.get('jwt'), usersIds: [userInfo.id] })
        }
    }

    const displayItems = () => {
        const apply = (user: UserInfo, index: number) => {
            return (
                <IonItem key={index} onClick={handleClick(user)}>
                    <IonLabel>{user.username}</IonLabel>
                </IonItem>
            )
        }
        return mapInList(displayedItems, apply)
    }

    useEffect(() => setDisplayedItems(users.
        filter((value: UserInfo) => value.username.indexOf(search) > -1))
        , [search])

    const handleSearchbar = (e: CustomEvent) => {
        setSearch((e.target as HTMLInputElement).value)
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

interface ChatInterface {
    user: UserData
    role: Role
}

interface Message {
    userId: number
    content: string
}

const Chat: React.FC<ChatInterface> = ({ user, role }) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [userMessage, setUsermessage] = useState('')
    const [conversationId, setConversationId] = useState(-1)
    const [receiverId, setReceiverId] = useState<number>(-1)
    const [discussionTitle, setDiscussionTitle] = useState('')

    socket.on('message', (conversationIdReceived: number, senderId: number, msg: string) => {
        if (conversationId === conversationIdReceived) {
            setMessages([...messages, { userId: senderId, content: msg }])
        }
    })

    const startConversation = (title: string, receiverId: number) => {
        socket.on('conversation', (id: number, messages: Message[]) => {
            setConversationId(id)
            setReceiverId(receiverId)
            setMessages(messages)
            console.log(JSON.stringify(messages))
        })
        setDiscussionTitle(title)
    }

    const sendMessage = () => {
        const cookie = getToken()
        const msg = userMessage
        socket.emit('message', { cookie, receiverId, conversationId, msg })
        setMessages([...messages, { userId: user.id, content: userMessage }])
        setUsermessage('')
    }

    const displayedMessages = messages.map((msg: Message, index) => {
        const content = (msg.userId === user.id ? 'Moi: ' : discussionTitle + ': ') + msg.content
        return <IonItem key={index}><IonLabel>{content}</IonLabel></IonItem>
    })

    const title = discussionTitle ? `Discuter avec ${discussionTitle}` : null
    return (
        <IonSplitPane contentId='main'>
            <SideBar user={user} setter={startConversation} />
            <IonPage id='main'>
                <h1>{title}</h1>
                <IonList>
                    {displayedMessages}
                </IonList>
                <IonInput type='text' value={userMessage} name='userMessage' placeholder='Votre message'
                    onIonInput={(e) => setUsermessage((e.target as HTMLInputElement).value)} />
                <IonButton onClick={sendMessage}>Envoyer</IonButton>
            </IonPage>
        </IonSplitPane>


    )
}

const dispatchToProps = (state: RootState) => ({
    user: getUser(state),
    role: getRole(state)
})

export default connect(dispatchToProps)(Chat)