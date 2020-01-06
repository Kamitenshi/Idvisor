import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonList, IonPopover, IonRow, IonText } from '@ionic/react'
import { Role, User } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteData, getData } from '../../utils/httpclient'
import { mapInGrid } from '../../utils/list'
import { signup, UserAccount } from '../session/sessionSlice'
import './AdminProfile.css'

interface AdminProfilePageInterface { }

const AdminProfilePage: React.FC<AdminProfilePageInterface> = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        async function getAllUsers() {
            setRefresh(false)
            const result = await (await getData('user', 'all')).data.result
            setUsers(result.map((user: User): UserAccount => { return { user: { email: user.email, username: user.username, id: user.id }, role: user.role } }))
        }

        getAllUsers()
    }, [refresh])

    const refreshUserList = () => {
        setRefresh(true)
    }

    const deleteUser = (user: UserAccount) => {
        return async function apply() {
            const query = { email: user.user.email }
            await deleteData('user', 'delete', query)
            //TODO: refresh list when user is deleted 
        }
    }

    const displayUsers = (userAccounts: UserAccount[]) => {
        const apply = (userAccount: UserAccount, index: number) => {
            return (
                <IonRow key={index}>
                    <IonCol>{userAccount.user.email}</IonCol>
                    <IonCol>{userAccount.user.username}</IonCol>
                    <IonCol>{userAccount.role}</IonCol>
                    <IonCol>
                        <IonButton color='danger' onClick={deleteUser(userAccount)}>Supprimer</IonButton>
                    </IonCol>
                </IonRow>
            )
        }

        return mapInGrid(['E-mail', 'Nom utilisateur', 'Role', ''], userAccounts, apply)
    }

    const [showPopover, setShowPopover] = useState(false)
    const [userType, setUserType] = useState<Role>('admin')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const submit = () => {
        const redirect = () => { setShowPopover(false); refreshUserList() }
        dispatch(signup(username, userType, email, password, redirect, setError))
    }
    const popover = (<IonPopover isOpen={showPopover} onDidDismiss={_ => setShowPopover(false)} id='popover'>

        <h1>Création d'un nouveau {userType}</h1>
        <form onSubmit={(e) => { e.preventDefault(); submit() }}>
            <IonList>
                <IonItem>
                    <IonLabel>Nom utilisateur</IonLabel>
                    <IonInput name="username" type="text" value={username} autofocus={true} required={true}
                        onIonInput={(e) => setUsername((e.target as HTMLInputElement).value)} />
                </IonItem>
                <IonItem>
                    <IonLabel>E-mail</IonLabel>
                    <IonInput name="email" type="email" value={email} required={true}
                        onIonInput={(e) => setEmail((e.target as HTMLInputElement).value)} />
                </IonItem>
                <IonItem>
                    <IonLabel>Mot de passe</IonLabel>
                    <IonInput name="password" type="password" value={password} required={true}
                        onIonInput={(e) => setPassword((e.target as HTMLInputElement).value)} />
                </IonItem>
            </IonList>
            <IonText color='danger'>{error}</IonText>
            <br />
            <IonButton type='submit'>Créer le nouvel utilisateur</IonButton>
        </form>
    </IonPopover>)

    const addAdmin = () => { setShowPopover(true); setUserType('admin') }
    const addAdvisor = () => { setShowPopover(true); setUserType('advisor') }
    return (
        <>
            {popover}
            <IonButton onClick={refreshUserList}>Rafraîchir la liste des utilisateurs</IonButton>
            <h1>Liste des utilisateurs</h1>
            {displayUsers(users)}
            <IonButton onClick={addAdmin}>Ajouter un administrateur</IonButton>
            <IonButton onClick={addAdvisor}>Ajouter un conseiller</IonButton>
        </>
    )
}



export default AdminProfilePage