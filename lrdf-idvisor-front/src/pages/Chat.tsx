import { IonContent, IonHeader, IonItem, IonLabel, IonMenu, IonPage, IonSearchbar, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react'
import Cookie from 'js-cookie'
import { Role, UserData } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import { getRole, getUser } from '../features/session/sessionSlice'
import { getData, socket } from '../utils/httpclient'
import { mapInList } from '../utils/list'


interface SideBarInterface {
    setter: React.Dispatch<React.SetStateAction<string>>
    role: Role
}

interface UserInfo {
    username: string,
    id: number
}

const SideBar: React.FC<SideBarInterface> = ({ role, setter }) => {
    const [users, setUsers] = useState<UserInfo[]>([])
    const [displayedItems, setDisplayedItems] = useState<any[]>([])
    const [search, setSearch] = useState('')
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        const getUserdata = async () => {
            const response = await getData('user', 'chat')
            setUsers(response.data.result.map((value: any) => { return { username: value.username, id: value.id } }))
        }
        getUserdata()
        setRefresh(false)
    }, [refresh])

    const handleClick = (userInfo: UserInfo) => {
        return () => {
            setter(userInfo.username)
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

    const handleSearchbar = (e: CustomEvent) => {
        setSearch((e.target as HTMLInputElement).value)
        setDisplayedItems(
            users.filter((value: UserInfo) => value.username.indexOf(search) > -1)
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

interface ChatInterface {
    user: UserData
    role: Role
}

const Chat: React.FC<ChatInterface> = ({ user, role }) => {
    const callbackGet = () => {
        socket.emit('message')
    }

    const [message, setMessage] = useState('')
    const [discussionTitle, setDiscussionTitle] = useState('')

    const title = discussionTitle ? <h1>Discuter avec {discussionTitle}</h1> : null
    return (
        <IonSplitPane contentId='main'>
            <SideBar role={role} setter={setDiscussionTitle} />
            <IonPage id='main'>
                {title}
            </IonPage>
        </IonSplitPane>


    )
}

const dispatchToProps = (state: RootState) => ({
    user: getUser(state),
    role: getRole(state)
})

export default connect(dispatchToProps)(Chat)