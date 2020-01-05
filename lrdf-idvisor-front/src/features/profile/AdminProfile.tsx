import { IonButton, IonCol, IonRow } from '@ionic/react'
import { User } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../../utils/httpclient'
import { mapInGrid } from '../../utils/list'
import { UserAccount } from '../session/sessionSlice'

interface AdminProfilePageInterface { }

const AdminProfilePage: React.FC<AdminProfilePageInterface> = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        async function getAllUsers() {
            setRefresh(false)
            const result = await (await getData('user', 'all')).data.result
            setUsers(result.map((user: User): UserAccount => { return { user: { email: user.email, username: user.username }, role: user.role } }))
        }

        getAllUsers()
    }, [refresh])

    const deleteUser = (user: UserAccount) => {
        return async function apply() {
            const query = { email: user.user.email }
            deleteData('user', 'delete', query)
            setRefresh(true)
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

    const refreshUserList = () => {
        setRefresh(true)
    }

    return (
        <>
            <IonButton onClick={refreshUserList}>Rafraîchir la liste des utilisateurs</IonButton>
            <h1>Liste des utilisateurs</h1>
            {displayUsers(users)}
            <IonButton>Ajouter un administrateur</IonButton>
            <IonButton>Ajouter un conseiller</IonButton>
        </>
    )
}



export default AdminProfilePage