import { IonButton, IonCol, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../../utils/httpclient'
import { mapInGrid } from '../../utils/list'
import { User } from '../session/sessionSlice'

interface AdminProfilePageInterface { }

const AdminProfilePage: React.FC<AdminProfilePageInterface> = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        async function getAllUsers() {
            setRefresh(false)
            const result = await (await getData('user', 'all')).data.result
            setUsers(result)
        }

        getAllUsers()
    }, [refresh])

    const deleteUser = (user: User) => {
        return async function apply() {
            deleteData('user', 'delete', user)
        }
    }

    const displayUsers = (users: User[]) => {
        const apply = (user: User, index: number) => {
            return (
                <>
                    <IonRow>
                        <IonCol>{user.email}</IonCol>
                        <IonCol>{user.username}</IonCol>
                        <IonCol>{user.role}</IonCol>
                        <IonCol>
                            <IonButton color='danger' onClick={deleteUser(user)}>Supprimer</IonButton>
                        </IonCol>
                    </IonRow>
                </>)
        }

        return mapInGrid(['E-mail', 'Nom utilisateur', 'Role', ''], users, apply)
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